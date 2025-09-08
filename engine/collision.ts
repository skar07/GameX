export type collidableObjectType = {
  position: { x: number; y: number; z?: number };
  velocity: { x: number; y: number };
  force: { x: number; y: number };
  mass: number;
};
export type CollidableObjectsPopulaceType = {
  mapId: string;
  collidableObjectsArray: collidableObjectType[];
};
type UsersToMapRelationType = {
  userId: string;
  mapsOfTheUser: CollidableObjectsPopulaceType[];
}; // 1 User : many maps

class collidableObject<T extends collidableObjectType> {
  position: T["position"];
  velocity: T["velocity"];
  force: T["force"];
  mass: T["mass"];
  constructor(props: T) {
    this.position = props.position;
    this.velocity = props.velocity;
    this.force = props.force;
    this.mass = props.mass;
  }
  getCollidableObject() {
    const collidablesObject = {
      positionOfObject: this.position,
      velocityOfObject: this.velocity,
      forceOfObject: this.force,
      objectMass: this.mass,
    };
    return { collidingObject: JSON.stringify(collidablesObject) };
  }
  setCollidableObject(newObject: T) {
    this.position = newObject.position;
    this.velocity = newObject.velocity;
    this.force = newObject.force;
    this.mass = newObject.mass;
    const collidablesObject = {
      positionOfObject: this.position,
      velocityOfObject: this.velocity,
      forceOfObject: this.force,
      objectMass: this.mass,
    };
    return collidablesObject;
  }
}

class CollisionObjectPopulace<T extends CollidableObjectsPopulaceType> {
  mapId: T["mapId"];
  collidableObjectsArray: T["collidableObjectsArray"];
  constructor(props: T) {
    this.mapId = props.mapId;
    this.collidableObjectsArray = props.collidableObjectsArray;
  }
  getCollidableObjectsPopulace() {
    return this.collidableObjectsArray;
  }
  setCollidableObjectsPopulace(
    newCollisionObject: T["collidableObjectsArray"]
  ) {
    this.collidableObjectsArray = newCollisionObject;
    return this.collidableObjectsArray;
  }
  createCollidableObjectPopulace(
    mapId: T["mapId"],
    collisionObjects: T["collidableObjectsArray"]
  ): T["collidableObjectsArray"] {
    this.mapId = mapId;
    this.collidableObjectsArray = new Array(collisionObjects.length);
    for (let i = 0; i < collisionObjects.length; i++) {
      this.collidableObjectsArray[i] = collisionObjects[i];
    }
    return this.collidableObjectsArray;
  }
}
class UsersToMapRelation<T extends UsersToMapRelationType> {
  userId: T["userId"];
  mapsOfTheUser: T["mapsOfTheUser"];
  constructor(props: T) {
    this.userId = props.userId;
    this.mapsOfTheUser = props.mapsOfTheUser;
  }
  getUsersToMapRelation() {
    return {
      userId: this.userId,
      "maps of the user": this.mapsOfTheUser,
    };
  }
  setUsersToMapRelation(
    incomingUserId: T["userId"],
    newMaps: T["mapsOfTheUser"]
  ) {
    if (this.userId === incomingUserId) {
      return (this.mapsOfTheUser = newMaps);
    }
    throw new Error(`404 UserId not found`);
  }
  addMapforUser(
    givenUserId: T["userId"],
    mapToBeAdded: CollidableObjectsPopulaceType
  ) {
    if (this.userId === givenUserId) {
      this.mapsOfTheUser.push(mapToBeAdded);
      return this.mapsOfTheUser;
    }
    throw new Error(`404 UserId not found`);
  }
  deleteMapForUser(
    givenUserId: T["userId"],
    mapId: CollidableObjectsPopulaceType["mapId"]
  ) {
    if (this.userId === givenUserId) {
      this.mapsOfTheUser = this.mapsOfTheUser.filter(
        (id) => mapId !== id.mapId
      );
    }
    return this.mapsOfTheUser;
  }
}
