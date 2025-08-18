type collisionObjectType = {
  position: { x: number; y: number };
  boundary: number;
  hitbox: number;
  area: number;
};

type BaseWorldType = {
  dimensions: number;
  primitive: string;
  size: {
    horizontal: number;
    width: number;
    height?: number;
  };
  collisionPopulace: Record<string, collisionObjectType>;
  type: "2D" | "3D";
  scrollType: "sideScroll" | "3DRevolve";
  
};
type WorldTemplateType = BaseWorldType & {
    worldId: number;
  style: "grid" | "fixed" | "open";
  camera: "3rdPerson" | "1stPerson";
  lighting: string;
  getWorld: () => number;
  setWorld: (newWorld: number) => number;
};

class BaseWorld<T extends BaseWorldType> {
  dimensions: T["dimensions"];
  primitive: T["primitive"]
  size: T["size"];
  collisionPopulace: T["collisionPopulace"];
  type: T["type"];
  scrollType: T["scrollType"];

  protected constructor(props: T) {
    this.dimensions = props.dimensions;
    this.primitive = props.primitive;
    this.size = props.size;
    this.collisionPopulace = props.collisionPopulace;
    this.type = props.type;
    this.scrollType = props.scrollType
  }
}

class WorldTemplate extends BaseWorld<WorldTemplateType> {
    worldId: WorldTemplateType["worldId"]
    style: WorldTemplateType["style"];
    camera: WorldTemplateType["camera"];
    lighting: WorldTemplateType["lighting"];
    constructor(props: WorldTemplateType){
        super(props)
        this.worldId = props.worldId;
        this.style = props.style;
        this.camera = props.camera;
        this.lighting = props.lighting;
    }
    getWorld(){
        return this.worldId;
    }
    setWorld(newWorld: number){
        return this.worldId = newWorld;
    }
    saveWorldToDB(){
        return {message: `World: ${this.worldId} added to DB`}
    }
    deleteWorldFromDB(){
        return {message: `World: ${this.worldId} removed from DB`}
    }
    fetchCollisionObjects(){
        return this.collisionPopulace // Will be a DB fetch eventually, right now just the value. The fetched value will be stored in collisionPopulace as intermediary cache, for no repeated DB fetches
    }
    saveCollisionObjects(collisionObject: collisionObjectType){
        return {message: `Collision Object: ${collisionObject} has been saved to the DB`}
    }
}
