//integrates the others  into a single interface (e.g., CollisionEngine class).

import { Shape, TwoDimensionCollisionDetection, AlgorithmType } from "./detection";

type CollisionEngineType = {
    twoDimensionCollision: () => any;
}

class CollisionEngine<T extends CollisionEngineType> {
    entity1: Shape;
    entity2: Shape;
    algorithm: AlgorithmType;
  constructor(arg0: Shape, arg1: Shape, algorithm: AlgorithmType) {
    this.entity1 = arg0;
    this.entity2 = arg1;
    this.algorithm = algorithm;
  }
  twoDimensionaCollision(){
    return TwoDimensionCollisionDetection(this.entity1, this.entity2, this.algorithm)
  }
}