import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Vector3, type Group } from "three";
import type { LabModel } from "../../data/models";

export interface DragState {
  rotX: number;
  rotY: number;
  velY: number;
  dragging: boolean;
}
export type DragRef = { current: DragState };
export const createDrag = (): DragState => ({ rotX: 0, rotY: 0, velY: 0, dragging: false });

function Shape({ kind, color }: { kind: LabModel["shape"]; color: string }) {
  return (
    <mesh>
      {kind === "knot" && <torusKnotGeometry args={[0.7, 0.24, 160, 24]} />}
      {kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {kind === "octa" && <octahedronGeometry args={[1.1, 0]} />}
      {kind === "torus" && <torusGeometry args={[0.8, 0.32, 24, 64]} />}
      {kind === "box" && <boxGeometry args={[1.3, 1.3, 1.3]} />}
      <meshPhysicalMaterial
        color={color}
        roughness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.15}
        flatShading={kind === "ico" || kind === "octa"}
      />
    </mesh>
  );
}

// Escala cualquier modelo al mismo tamaño y lo centra
function GltfModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const cloned = useMemo(() => scene.clone(), [scene]);
  const scale = useMemo(() => {
    const size = new Box3().setFromObject(cloned).getSize(new Vector3());
    return 1.8 / (Math.max(size.x, size.y, size.z) || 1);
  }, [cloned]);
  return (
    <Center>
      <primitive object={cloned} scale={scale} />
    </Center>
  );
}

interface Props {
  model: LabModel;
  drag: DragRef;
  active: boolean;
  hovered: boolean;
  spin: number; 
}

export default function ModelScene({ model, drag, active, hovered, spin }: Props) {
  const group = useRef<Group>(null);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current;
    if (!d.dragging) {
      d.rotY += (d.velY + spin * (active ? 1 : 0.5)) * dt;
      d.velY *= Math.pow(0.04, dt); 
      d.rotX *= Math.pow(0.2, dt); 
    }
    g.rotation.set(d.rotX, d.rotY, 0);
    g.scale.setScalar(MathUtils.damp(g.scale.x, hovered || active ? 1.1 : 1, 6, dt));
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={38} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, -3]} intensity={1} color="#b36bff" />
      <Suspense fallback={null}>
        <group ref={group}>
          {model.src ? <GltfModel src={model.src} /> : <Shape kind={model.shape} color={model.color} />}
        </group>
      </Suspense>
    </>
  );
}