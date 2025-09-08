
import { Shape, TwoDimensionCollisionDetection, AlgorithmType } from "./detection.js";

type CollisionEngineType = {
    twoDimensionCollision: () => any;
}

export class CollisionEngine<T extends CollisionEngineType> {
    entity1: Shape;
    entity2: Shape;
    algorithm: AlgorithmType;
  constructor(arg0: Shape, arg1: Shape, algorithm: AlgorithmType) {
    this.entity1 = arg0;
    this.entity2 = arg1;
    this.algorithm = algorithm;
  }
  twoDimensionalCollision(){
    return TwoDimensionCollisionDetection(this.entity1, this.entity2, this.algorithm)
  }
}