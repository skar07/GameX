/**
 * Takes two object parameters which contain position of two entities, and detects collision
 * Narrow-phase algorithms (AABB, SAT, etc.)
 * @param {object} entity1 containing the position of the first entity object
 * @param {object} entity2 containing the position of the second entity object
 * @param {string} algorithm tells the detection algorithm to be used out of the selction
 * @returns {boolean} Tells if the two entities are colliding or not
 */

export type AlgorithmType = "AABB" | "Circle" | "SAT" | "SweptAABB";
export type Shape =
  | {
      kind: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      vx?: number;
      vy?: number;
      dt?: number;
    }
  | {
      kind: "circle";
      x: number;
      y: number;
      radius: number;
      vx?: number;
      vy?: number;
      dt?: number;
    };



function algorithmAABB(
  entity1: Readonly<Extract<Shape, { kind: "rect" }>>,
  entity2: Readonly<Extract<Shape, { kind: "rect" }>>
): boolean {
  return (
    entity1.x < entity2.x + entity2.width &&
    entity1.x + entity1.width > entity2.x &&
    entity1.y < entity2.y + entity2.height &&
    entity1.y + entity1.height > entity2.y
  );
}

function algorithmCircleCollision(
  entity1: Readonly<Extract<Shape, { kind: "circle" }>>,
  entity2: Readonly<Extract<Shape, { kind: "circle" }>>
): boolean {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    const distanceSq = dx * dx + dy * dy;
    const radiusSum = entity1.radius + entity2.radius;
    return distanceSq < radiusSum * radiusSum;
}

function algorithmSAT(
  entity1: Readonly<Shape>,
  entity2: Readonly<Shape>
): boolean {
  // TODO: Will implement later
  throw new Error(
    `Unsupported algorithm type provided. Algorithm type not available`
  );
}

function algorithmSweptAABB(
  entity1: Readonly<Shape>,
  entity2: Readonly<Shape>
): boolean {
  // TODO: Will implement later, API is usable so can work on this in my own time
  throw new Error(
    `Unsupported algorithm type provided. Algorithm type not available`
  );
}
//API/Interface for using collision detection
export function TwoDimensionCollisionDetection(
  entity1: Readonly<Shape>,
  entity2: Readonly<Shape>,
  algorithmType: AlgorithmType,
 ): boolean {
  switch (entity1.kind, entity2.kind, algorithmType) {
    case "AABB":
      return (
        entity1.kind === "rect" &&
        entity2.kind === "rect" &&
        algorithmAABB(entity1, entity2)
      );
    case "Circle":
      return (
        entity1.kind === "circle" &&
        entity2.kind === "circle" &&
        algorithmCircleCollision(entity1, entity2)
      );
    case "SAT":
      return algorithmSAT(entity1, entity2);
    case "SweptAABB":
      return algorithmSweptAABB(entity1, entity2);
    default:
      throw new Error(
        `Invalid algorithm type provided. Algorithm type not available`
      );
  }
}
