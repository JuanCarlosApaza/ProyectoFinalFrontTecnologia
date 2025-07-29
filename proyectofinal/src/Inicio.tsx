import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import type { promociones } from "./interfaces/Promociones";

const Inicio = () => {
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [promociones,setpromociones] = useState<promociones[]>([]);
useEffect(()=>{
  fetch("http://127.0.0.1:8000/api/promociones")
    .then((response) => response.json())
    .then((data) => {
      setpromociones(data);
    })

},[])

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const width = contenedor.clientWidth;
    const height = contenedor.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Fondo blanco

    const camera = new THREE.PerspectiveCamera(18, width / height, 0.3, 1000);
    camera.position.set(9, 5, 9); // Cámara

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    contenedor.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.target.set(0, 2, 0);
    controls.update();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let paisaje: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      "/models/fondosll.glb",
      (gltf) => {
        paisaje = gltf.scene;
        paisaje.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(paisaje);
      },
      undefined,
      (error) => {
        console.error("Error al cargar fondo.glb", error);
      }
    );

    const handleClick = (event: MouseEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (paisaje) {
        const intersects = raycaster.intersectObject(paisaje, true);
        if (intersects.length > 0) {
          const nombre = intersects[0].object.name;
          console.log("Clic en:", nombre);

          if (nombre === "Cube003") {
            navigate("homecategorias");
          } else if (nombre === "productos") {
            navigate("/listarproductos");
          } else if (nombre === "empresas") {
            navigate("/homeempresas");
          } else if (nombre === "tabla") {
            const objeto = intersects[0].object;
            const target = new THREE.Vector3();
            objeto.getWorldPosition(target);

            gsap.to(camera.position, {
              duration: 1,
              x: target.x + 3,
              y: target.y + 2,
              z: target.z + 3,
              onUpdate: () => {
                controls.update();
              },
            });

            gsap.to(controls.target, {
              duration: 1,
              x: target.x,
              y: target.y,
              z: target.z,
              onUpdate: () => {
                controls.update();
              },
            });

            setMostrarGaleria(true);
          }
        }
      }
    };

    const onresize = () => {
      const newWidth = contenedor.clientWidth;
      const newHeight = contenedor.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", onresize);
    renderer.domElement.addEventListener("click", handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onresize);
      renderer.domElement.removeEventListener("click", handleClick);
      contenedor.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [navigate]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={contenedorRef}
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      />
      {mostrarGaleria && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
          <h2 className="text-xl font-bold mb-4">Galería - Tabla</h2>
          <div className="flex gap-4 overflow-x-auto p-4 max-w-full">
            {promociones.map((src, i) => (
              <img
                key={i}
                src={`http://127.0.0.1:8000/storage/${promociones[i].imagen}`}
                alt={`tabla-${i}`}
                className="w-64 h-40 object-cover rounded shadow"
              />
            ))}
          </div>
          <button
            onClick={() => setMostrarGaleria(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar galería
          </button>
        </div>
      )}
    </div>
  );
};

export default Inicio;
