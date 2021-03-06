import CubeGroup from "./group";
import World from "./world";



export default class Preferance {
    private world: World;
    constructor(world: World) {
    this.world = world;
    }
    private data = {
    version: "0.4",
    scale: 50,
    perspective: 50,
    angle: 60,
    gradient: 65,
    frames: 20,
    sensitivity: 3,
    mirror: false,
    hollow: false,
    shadow: true,
    };

    load(value: string) {
    let data = JSON.parse(value);
    this.data = data;
    // remove version control
    // if (data.version === this.data.version) {
    //     this.data = data;
    // }
    }
    get value() {
    return JSON.stringify(this.data);
    }

    refresh() {
    this.scale = this.data.scale;
    this.perspective = this.data.perspective;
    this.angle = this.data.angle;
    this.gradient = this.data.gradient;
    this.shadow = this.data.shadow;
    this.frames = this.data.frames;
    this.mirror = this.data.mirror;
    this.hollow = this.data.hollow;
    }

    get scale() {
    return this.data.scale;
    }
    set scale(value) {
    if (this.data.scale != value) {
        this.data.scale = value;
    }
    this.world.scale = value / 100 + 0.5;
    this.world.resize();
    }

    get perspective() {
    return this.data.perspective;
    }
    set perspective(value) {
    if (this.data.perspective != value) {
        this.data.perspective = value;
    }
    this.world.perspective = (100.1 / (value + 0.01)) * 4 - 3;
    this.world.resize();
    }

    get angle() {
    return this.data.angle;
    }
    set angle(value) {
    if (this.data.angle != value) {
        this.data.angle = value;
    }
    this.world.scene.rotation.y = ((value / 100 - 1) * Math.PI) / 2;
    this.world.dirty = true;
    }

    get gradient() {
    return this.data.gradient;
    }
    set gradient(value) {
    if (this.data.gradient != value) {
        this.data.gradient = value;
    }
    this.world.scene.rotation.x = ((1 - value / 100) * Math.PI) / 2;
    this.world.dirty = true;
    }

    get shadow() {
    return this.data.shadow;
    }
    set shadow(value) {
    if (this.data.shadow != value) {
        this.data.shadow = value;
    }
    if (value) {
        this.world.ambient.intensity = 0.8;
        this.world.directional.intensity = 0.2;
    } else {
        this.world.ambient.intensity = 1;
        this.world.directional.intensity = 0;
    }
    this.world.dirty = true;
    }

    get frames() {
    return this.data.frames;
    }
    set frames(value) {
    if (this.data.frames != value) {
        this.data.frames = value;
    }
    CubeGroup.frames = value;
    }

    get sensitivity() {
    return this.data.sensitivity;
    }
    set sensitivity(value) {
    if (this.data.sensitivity != value) {
        this.data.sensitivity = value;
    }
    let i = (value - 3) / 2;
    i = 2 ** i;
    this.world.controller.sensitivity = i;
    }

    get mirror() {
    return this.data.mirror;
    }
    set mirror(value) {
    if (this.data.mirror != value) {
        this.data.mirror = value;
    }
    for (let cubelet of this.world.cube.cubelets) {
        cubelet.mirror = value;
    }
    this.world.dirty = true;
    }

    get hollow() {
    return this.data.hollow;
    }
    set hollow(value: boolean) {
    if (this.data.hollow != value) {
        this.data.hollow = value;
    }
    for (let cubelet of this.world.cube.cubelets) {
        cubelet.hollow = value;
    }
    this.world.dirty = true;
    }
}