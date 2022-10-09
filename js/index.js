import * as THREE from 'three';
import * as YUKA from 'yuka';
import * as dat from 'dat.gui';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import gsap from 'gsap';
import TextSprite from '@seregpie/three.text-sprite/index.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { generateTextSprite } from './ThreeJs-Text-Sprite.js';

// import nebula from '../img/Nebula.jpg';
// import space from '../img/Space.jpg';

// FLOOR TEXTURE
import concreteMap from '../img/Concrete_Wall/Concrete_Wall_basecolor.jpg';
import concreteNormalMap from '../img/Concrete_Wall/Concrete_Wall_normal.jpg';
import concreteRoughnessMap from '../img/Concrete_Wall/Concrete_Wall_roughness.jpg';

// FLOOR TEXTURE 2
import tilesMap from '../img/Tiles_Hexagons/Tiles_Hexagons_basecolor.jpg';
import tilesNormalMap from '../img/Tiles_Hexagons/Tiles_Hexagons_normal.jpg';
import tilesMetalicMap from '../img/Tiles_Hexagons/Tiles_Hexagons_metallic.jpg';
import tilesRoughnessMap from '../img/Tiles_Hexagons/Tiles_Hexagons_roughness.jpg';

// WOOD TEXTURE 2
import woodMap from '../img/Wood/Wood_basecolor.jpg';
import woodNormalMap from '../img/Wood/Wood_normal.jpg';
import woodRoughnessMap from '../img/Wood/Wood_roughness.jpg';
import woodAmbientMap from '../img/Wood/Wood_ambientOcclusion.jpg';
import TextSprite from '@seregpie/three.text-sprite';

const SoldierWoman = new URL( '../assets/SoldierWoman.glb', import.meta.url );
const ColombianGirl = new URL( '../assets/ColombianGirl.glb', import.meta.url );
const TifaGirl = new URL( '../assets/TifaGirl.glb', import.meta.url );
const CloudBoy = new URL( '../assets/CloudBoy.glb', import.meta.url );
const AfricanBoy = new URL( '../assets/AfricanBoy.glb', import.meta.url );
const SaturnBoy = new URL( '../assets/SaturnBoy.glb', import.meta.url );
const MikaelaWoman = new URL( '../assets/MikaelaWoman.glb', import.meta.url );
const AkitoMan = new URL( '../assets/AkitoMan.glb', import.meta.url );
const TerryMan = new URL( '../assets/TerryMan.glb', import.meta.url );
const TifaWoman = new URL( '../assets/TifaWoman.glb', import.meta.url );
const BeccaWoman = new URL( '../assets/BeccaWoman.glb', import.meta.url );
const ValerieWoman = new URL( '../assets/ValerieWoman.glb', import.meta.url );
const DoctorMan = new URL( '../assets/DoctorMan.glb', import.meta.url );
const FireMan = new URL( '../assets/FireMan.glb', import.meta.url );
const NurseWoman = new URL( '../assets/NurseWoman.glb', import.meta.url );
const PoliceMan = new URL( '../assets/PoliceMan.glb', import.meta.url );
const ResidentWoman = new URL( '../assets/ResidentWoman.glb', import.meta.url );
const JaniceWoman = new URL( '../assets/JaniceWoman.glb', import.meta.url );
const MorganMan = new URL( '../assets/MorganMan.glb', import.meta.url );
const CaptainMan = new URL( '../assets/CaptainMan.glb', import.meta.url );
const ShimaWoman = new URL( '../assets/ShimaWoman.glb', import.meta.url );
const ShelbyMan = new URL( '../assets/ShelbyMan.glb', import.meta.url );
const NunWoman = new URL( '../assets/NunWoman.glb', import.meta.url );
const MonkMan = new URL( '../assets/MonkMan.glb', import.meta.url );

let dControl, 
    textSprite,
    objects = [],
    tControlPos, 
    tControlSca, 
    tControlRot;



// ------------------------------------------------- CANVAS SETUP ------------------------------------------------- //

const threejsCanvas = document.querySelector( '#threejs-canvas' );

// ------------------------------------------------- CANVAS SETUP ------------------------------------------------- //




// ------------------------------------------------- INIT ------------------------------------------------- //

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

threejsCanvas.appendChild( renderer.domElement );

const scene = new THREE.Scene();

// ------------------------------------------------- INIT ------------------------------------------------- //




// ------------------------------------------------- CAMERA / AXES ------------------------------------------------- //

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 2, 5 );
orbit.enableDamping = true;
orbit.update();

const axesHelper = () => {

    const axesHelper = new THREE.AxesHelper( 3 );
    scene.add( axesHelper );
};

const carousel = document.querySelector( '.select-character' );

carousel.addEventListener( 'click', () => {
    
    orbit.reset();
    orbit.target.set( 0, -22.769, 0 );
    camera.position.set( 6, -20, -10.5 );
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 4;
});

const back = document.querySelector( '.return' );

back.addEventListener( 'click', () => {

    orbit.reset();
    camera.position.set( 14.5392, 9.7729, 0.0309 );
    orbit.autoRotate = false;
    camera.zoom = 2
});

const cameraEvent = () => {

    window.addEventListener( 'click', () => {
        console.log(orbit)
        console.log(camera.position)

        gsap.to( camera.position, {
            z: 14,
            duration: 0
        });
    });
};

// ------------------------------------------------- CAMERA / AXES ------------------------------------------------- //




// ------------------------------------------------- LOADING SCREEN ------------------------------------------------- //

const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById( 'progress-bar' );
const progressBarContainer = document.querySelector( '.progress-bar-container' );

loadingManager.onProgress = ( url, loaded, total ) => {
    progressBar.value = ( loaded / total ) * 100;
};

loadingManager.onLoad = () => {
    progressBarContainer.style.display = 'none';
};

const gltfLoader = new GLTFLoader( loadingManager );
const rgbeLoader = new RGBELoader( loadingManager );

// ------------------------------------------------- LOADING SCREEN ------------------------------------------------- //




// ------------------------------------------------- MESH ------------------------------------------------- //

const aBox = () => {

    const textureMap = new THREE.TextureLoader().load( tilesMap );
    const textureNormals = new THREE.TextureLoader().load( tilesNormalMap );
    const textureMetalic = new THREE.TextureLoader().load( tilesMetalicMap );
    const textureRoughness = new THREE.TextureLoader().load( tilesRoughnessMap );

    const aBoxGeometry = new THREE.BoxGeometry( 24, 24, 1, 5, 5, 5 );
    const aBoxMaterial = new THREE.MeshStandardMaterial( { 
        map: textureMap,
        normalMap: textureNormals,
        metalnessMap: textureMetalic,
        roughnessMap: textureRoughness
    } );
    const aBox = new THREE.Mesh( aBoxGeometry, aBoxMaterial );
    scene.add( aBox );

    aBox.map = textureMap;
    textureMap.wrapS = THREE.RepeatWrapping;
    textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.repeat.set( 5, 5 );

    aBox.normalMap = textureNormals;
    textureNormals.wrapS = THREE.RepeatWrapping;
    textureNormals.wrapT = THREE.RepeatWrapping;
    textureNormals.repeat.set( 5, 5 );

    aBox.roughnessMap = textureRoughness;
    textureRoughness.wrapS = THREE.RepeatWrapping;
    textureRoughness.wrapT = THREE.RepeatWrapping;
    textureRoughness.repeat.set( 5, 5 );

    aBox.metalnessMap = textureMetalic;
    textureRoughness.wrapS = THREE.RepeatWrapping;
    textureRoughness.wrapT = THREE.RepeatWrapping;
    textureRoughness.repeat.set( 5, 5 );

    aBox.receiveShadow = true;
    aBox.name = 'GROUND';
    aBox.rotateX( -Math.PI / 2 );
    aBox.position.set( 0, -0.55 , 0 );
};

const aPlane1 = () => {

    const aPlaneGeometry = new THREE.PlaneGeometry( 20, 5 );
    const aPlaneMaterial = new THREE.MeshStandardMaterial( { 
        color: 0xAA20FF,
        transparent: true
    } );
    const aPlane = new THREE.Mesh( aPlaneGeometry, aPlaneMaterial );
    scene.add( aPlane );

    aPlane.material.opacity = 0.1;
    aPlane.rotation.x = -0.5 * Math.PI;
    aPlane.position.set( 0, 0.01 , 7.5 );
    aPlane.receiveShadow = true;
};

const aPlane2 = () => {

    const aPlaneGeometry = new THREE.PlaneGeometry( 20, 5 );
    const aPlaneMaterial = new THREE.MeshStandardMaterial( { 
        color: 0xFFFF33,
        transparent: true
    } );
    const aPlane = new THREE.Mesh( aPlaneGeometry, aPlaneMaterial );
    scene.add( aPlane );

    aPlane.material.opacity = 0.1;
    aPlane.rotation.x = -0.5 * Math.PI;
    aPlane.position.set( 0, 0.01 , 2.5 );
    aPlane.receiveShadow = true;
};

const aPlane3 = () => {

    const aPlaneGeometry = new THREE.PlaneGeometry( 20, 5 );
    const aPlaneMaterial = new THREE.MeshStandardMaterial( { 
        color: 0xFF3333,
        transparent: true
    } );
    const aPlane = new THREE.Mesh( aPlaneGeometry, aPlaneMaterial );
    scene.add( aPlane );

    aPlane.material.opacity = 0.1;
    aPlane.rotation.x = -0.5 * Math.PI;
    aPlane.position.set( 0, 0.01 , -2.5 );
    aPlane.receiveShadow = true;
};

const aPlane4 = () => {

    const aPlaneGeometry = new THREE.PlaneGeometry( 20, 5 );
    const aPlaneMaterial = new THREE.MeshStandardMaterial( { 
        color: 0x12DFFF,
        transparent: true
    } );
    const aPlane = new THREE.Mesh( aPlaneGeometry, aPlaneMaterial );
    scene.add( aPlane );

    aPlane.material.opacity = 0.1;
    aPlane.rotation.x = -0.5 * Math.PI;
    aPlane.position.set( 0, 0.01 , -7.5 );
    aPlane.receiveShadow = true;
};

const aPlaneMesh = () => {

    const textureMap = new THREE.TextureLoader().load( concreteMap );
    const textureRoughness = new THREE.TextureLoader().load( concreteRoughnessMap );
    const textureNormals = new THREE.TextureLoader().load( concreteNormalMap );

    const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry( 20, 20 ),
        new THREE.MeshStandardMaterial({
            map: textureMap,
            normalMap: textureNormals,
            roughnessMap: textureRoughness
        })
    );
    scene.add( planeMesh );

    planeMesh.map = textureMap;
    textureMap.wrapS = THREE.RepeatWrapping;
    textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.repeat.set( 2.5, 2.5 );

    planeMesh.normalMap = textureNormals;
    textureNormals.wrapS = THREE.RepeatWrapping;
    textureNormals.wrapT = THREE.RepeatWrapping;
    textureNormals.repeat.set( 2.5, 2.5 );

    planeMesh.roughnessMap = textureRoughness;
    textureRoughness.wrapS = THREE.RepeatWrapping;
    textureRoughness.wrapT = THREE.RepeatWrapping;
    textureRoughness.repeat.set( 2.5, 2.5 );

    planeMesh.rotateX( -Math.PI / 2 );
    planeMesh.receiveShadow = true;
    planeMesh.name = 'ground';
};

const cilinderMesh = ( radiusT, radiusB, segments, positionY ) => {

    const textureMap = new THREE.TextureLoader().load( woodMap );
    const textureNormals = new THREE.TextureLoader().load( woodNormalMap );
    const textureRoughness = new THREE.TextureLoader().load( woodRoughnessMap );
    const textureAmbient = new THREE.TextureLoader().load( woodAmbientMap );

    const cilinderMesh = new THREE.Mesh(
        new THREE.CylinderGeometry( radiusT, radiusB, 1, segments, 1 ),
        new THREE.MeshStandardMaterial( {
            map: textureMap,
            envMap: textureAmbient,
            normalMap: textureNormals,
            roughnessMap: textureRoughness
        } )
    );
    scene.add( cilinderMesh );

    cilinderMesh.map = textureMap;
    cilinderMesh.envMap = textureAmbient;
    cilinderMesh.normalMap = textureNormals;
    cilinderMesh.roughnessMap = textureRoughness;

    cilinderMesh.receiveShadow = true;
    cilinderMesh.name = 'carousel';
    cilinderMesh.position.set( 0, positionY, 0 );
};

const cube = () => {

    const cubeMesh = new THREE.Mesh(
        new THREE.BoxGeometry( 30, 10, 30 ),
        new THREE.MeshStandardMaterial( {
            side: THREE.DoubleSide,
            color: 0xFFFFFF
        } )
    );
    scene.add( cubeMesh );

    cubeMesh.position.set( 0, -17, 0 );
};

const highLightMesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1 ),
    new THREE.MeshStandardMaterial( { color: 0xFFFFFF } )
);
scene.add( highLightMesh );

highLightMesh.rotateX( -Math.PI / 2 );
highLightMesh.receiveShadow = true;
highLightMesh.position.set( 0.5, 0.01, 0.5 );


// const gridHelper = new THREE.GridHelper( 26, 26 );
// scene.add( gridHelper );

aPlaneMesh();
aBox();
aPlane1();
aPlane2();
aPlane3();
aPlane4();
cube();
cilinderMesh( 10, 10.5, 50, -21.5 );
cilinderMesh( 7, 7.5, 40, -20.5 );

// ------------------------------------------------- MESH ------------------------------------------------- //




// ------------------------------------------------- UV MAP ------------------------------------------------- //

function assignUVs( geometry ) {

    geometry.faceVertexUvs[0] = [];

    geometry.faces.forEach( ( face ) => {

        var components = [ 'x', 'y', 'z' ].sort( (a, b) => {
            return Math.abs( face.normal[a] ) > Math.abs( face.normal[b] );
        } );

        var v1 = geometry.vertices[ face.a ];
        var v2 = geometry.vertices[ face.b ];
        var v3 = geometry.vertices[ face.c ];

        geometry.faceVertexUvs[0].push( [
            new THREE.Vector2( v1[components[0]], v1[components[1]] ),
            new THREE.Vector2( v2[components[0]], v2[components[1]] ),
            new THREE.Vector2( v3[components[0]], v3[components[1]] )
        ] );

    } );

    geometry.uvsNeedUpdate = true;
};

// ------------------------------------------------- UV MAP ------------------------------------------------- //




// ------------------------------------------------- ILLUMINATION ------------------------------------------------- //

const ambientLight = new THREE.AmbientLight( 0xFFFFFF );
scene.add( ambientLight );

const directionalLight = () => {

    const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.8 );
    scene.add( directionalLight );

    directionalLight.position.set( -30, 50, 0 );
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.bottom = -12;
    
    const dLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( dLightHelper );
    
    const dLightShadowHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
    scene.add( dLightShadowHelper );
};

const spotLight = () => {

    const spotLight = new THREE.SpotLight( 0xAFFFFF, 0.5 );
    scene.add( spotLight );

    spotLight.position.set( -20, 8, 20) ;
    spotLight.castShadow = true;
    spotLight.angle = 0.5;

    // const sLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(sLightHelper);
};

const fogAmbient = () => {

    scene.fog = new THREE.Fog( 0x00B30, 10, 100 );
    scene.fog = new THREE.FogExp2( 0x00B30, 0.05 );
};

const texture2D = () => {

    const textureLoader = new THREE.TextureLoader(); 
    scene.background = textureLoader.load( space ); 
};

const texture3D = () => {

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        space,
        space,
        space,
        space,
        space,
        space
    ]);
};

renderer.setClearColor( 0x00B30 ); // background color
spotLight();

// ------------------------------------------------- ILLUMINATION ------------------------------------------------- //




// ------------------------------------------------- BOXES ------------------------------------------------- //

const createBoxes = () => {

    const boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, );
    const boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } );
    const box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.set( 0, 0, 0 );
    box.name = 'BOX';
    scene.add( box );
    
    const boxGeometry2 = new THREE.BoxGeometry( 0.5, 0.5, 0.5, );
    const boxMaterial2 = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } );
    const box2 = new THREE.Mesh( boxGeometry2, boxMaterial2 );
    box2.position.set( 0, 0, 0 );
    box2.name = 'BOX';
    scene.add( box2 );
    
    objects.push( box );
    objects.push( box2 );
};

// ------------------------------------------------- BOXES ------------------------------------------------- //





// ------------------------------------------------- MODELS ------------------------------------------------- //

// ------------------------------------------------- SOLDIER WOMAN 001 ------------------------------------------------- //

let soldierW001Model;
let soldierW001Clips;
let soldierW001Mixer;

const soldierWoman001 = () => {
    
    new GLTFLoader( loadingManager ).load( SoldierWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '001';
            boxModel.position.set( 0, -20, -6.5 );
            boxModel.rotateY( -9.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        soldierW001Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        soldierW001Clips = gltf.animations;
        soldierW001Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( soldierW001Clips, 'idle' );
        const action = soldierW001Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

soldierWoman001();

// ------------------------------------------------- SOLDIER WOMAN 001 ------------------------------------------------- //

// ------------------------------------------------- TIFA GIRL 002 ------------------------------------------------- //

let tifaG002Model;
let tifaG002Clips;
let tifaG002Mixer;

const tifaGirl002 = () => {
    
    new GLTFLoader( loadingManager ).load( TifaGirl.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '002';
            boxModel.position.set( 4.55, -20, -4.55 );
            boxModel.rotateY( -4 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        tifaG002Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        tifaG002Clips = gltf.animations;
        tifaG002Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( tifaG002Clips, 'idle' );
        const action = tifaG002Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

tifaGirl002();

// ------------------------------------------------- TIFA GIRL 002 ------------------------------------------------- //

// ------------------------------------------------- COLOMBIAN GIRL 003 ------------------------------------------------- //

let colombianG003Model;
let colombianG003Clips;
let colombianG003Mixer;

const colombianGirl003 = () => {
    
    new GLTFLoader( loadingManager ).load( ColombianGirl.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '003';
            boxModel.position.set( -4.55, -20, 4.55 );
            boxModel.rotateY( 5.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        colombianG003Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        colombianG003Clips = gltf.animations;
        colombianG003Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( colombianG003Clips, 'idle' );
        const action = colombianG003Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

colombianGirl003();

// ------------------------------------------------- COLOMBIAN GIRL 003 ------------------------------------------------- //

// ------------------------------------------------- CLOUD BOY 004 ------------------------------------------------- //

let cloudB004Model;
let cloudB004Clips;
let cloudB004Mixer;

const cloudBoy004 = () => {
    
    new GLTFLoader( loadingManager ).load( CloudBoy.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '004';
            boxModel.position.set( -4.55, -20, -4.55 );
            boxModel.rotateY( 4 );
            objects.push( boxModel ); 
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        cloudB004Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        cloudB004Clips = gltf.animations;
        cloudB004Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( cloudB004Clips, 'idle' );
        const action = cloudB004Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

cloudBoy004();

// ------------------------------------------------- CLOUD BOY 004 ------------------------------------------------- //

// ------------------------------------------------- AFRICAN BOY 005 ------------------------------------------------- //

let africanB005Model;
let africanB005Clips;
let africanB005Mixer;

const africanBoy005 = () => {
    
    new GLTFLoader( loadingManager ).load( AfricanBoy.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '005';
            boxModel.position.set( 4.55, -20, 4.55 );
            boxModel.rotateY( -5.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        africanB005Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        africanB005Clips = gltf.animations;
        africanB005Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( africanB005Clips, 'idle' );
        const action = africanB005Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

africanBoy005();

// ------------------------------------------------- AFRICAN BOY 005 ------------------------------------------------- //

// ------------------------------------------------- SATURN BOY 006 ------------------------------------------------- //

let saturnB006Model;
let saturnB006Clips;
let saturnB006Mixer;

const saturnBoy006 = () => {
    
    new GLTFLoader( loadingManager ).load( SaturnBoy.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '006';
            boxModel.position.set( 6.5, -20, 0 );
            boxModel.rotateY( 1.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        saturnB006Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        saturnB006Clips = gltf.animations;
        saturnB006Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( saturnB006Clips, 'idle' );
        const action = saturnB006Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

saturnBoy006();

// ------------------------------------------------- SATURN BOY 006 ------------------------------------------------- //

// ------------------------------------------------- MIKAELA WOMAN 007 ------------------------------------------------- //

let mikaelaW007Model;
let mikaelaW007Clips;
let mikaelaW007Mixer;

const mikaelaWoman007 = () => {
    
    new GLTFLoader( loadingManager ).load( MikaelaWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '007';
            boxModel.position.set( -6.5, -20, 0 );
            boxModel.rotateY( -1.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        mikaelaW007Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        mikaelaW007Clips = gltf.animations;
        mikaelaW007Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( mikaelaW007Clips, 'idle' );
        const action = mikaelaW007Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

mikaelaWoman007();

// ------------------------------------------------- MIKAELA WOMAN 007 ------------------------------------------------- //

// ------------------------------------------------- AKITO MAN 008 ------------------------------------------------- //

let akitoM008Model;
let akitoM008Clips;
let akitoM008Mixer;

const akitoMan008 = () => {
    
    new GLTFLoader( loadingManager ).load( AkitoMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '008';
            boxModel.position.set( 0, -20, 6.5 );
            boxModel.rotateY( 0 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        akitoM008Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        akitoM008Clips = gltf.animations;
        akitoM008Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( akitoM008Clips, 'idle' );
        const action = akitoM008Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

akitoMan008();

// ------------------------------------------------- AKITO MAN 008 ------------------------------------------------- //

// ------------------------------------------------- TERRY MAN 009 ------------------------------------------------- //

let terryM009Model;
let terryM009Clips;
let terryM009Mixer;

const terryMan009 = () => {
    
    new GLTFLoader( loadingManager ).load( TerryMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '009';
            boxModel.position.set( 0, -21, -9.5 );
            boxModel.rotateY( -9.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        terryM009Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        terryM009Clips = gltf.animations;
        terryM009Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( terryM009Clips, 'idle' );
        const action = terryM009Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

terryMan009();

// ------------------------------------------------- TERRY MAN 009 ------------------------------------------------- //

// ------------------------------------------------- TIFA WOMAN 010 ------------------------------------------------- //

let tifaW010Model;
let tifaW010Clips;
let tifaW010Mixer;

const tifaWoman010 = () => {
    
    new GLTFLoader( loadingManager ).load( TifaWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '010';
            boxModel.position.set( 6.75, -21, -6.75 );
            boxModel.rotateY( -4 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        tifaW010Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        tifaW010Clips = gltf.animations;
        tifaW010Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( tifaW010Clips, 'idle' );
        const action = tifaW010Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

tifaWoman010();

// ------------------------------------------------- TIFA WOMAN 010 ------------------------------------------------- //

// ------------------------------------------------- BECCA WOMAN 011 ------------------------------------------------- //

let beccaW011Model;
let beccaW011Clips;
let beccaW011Mixer;

const beccaWoman011 = () => {
    
    new GLTFLoader( loadingManager ).load( BeccaWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '011';
            boxModel.position.set( -6.75, -21, 6.75 );
            boxModel.rotateY( 5.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        beccaW011Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        beccaW011Clips = gltf.animations;
        beccaW011Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( beccaW011Clips, 'idle' );
        const action = beccaW011Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

beccaWoman011();

// ------------------------------------------------- BECCA WOMAN 011 ------------------------------------------------- //

// ------------------------------------------------- VALERIE WOMAN 012 ------------------------------------------------- //

let valerieW012Model;
let valerieW012Clips;
let valerieW012Mixer;

const valerieWoman012 = () => {
    
    new GLTFLoader( loadingManager ).load( ValerieWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '012';
            boxModel.position.set( -6.75, -21, -6.75 );
            boxModel.rotateY( 4 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        valerieW012Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        valerieW012Clips = gltf.animations;
        valerieW012Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( valerieW012Clips, 'idle' );
        const action = valerieW012Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

valerieWoman012();

// ------------------------------------------------- VALERIE WOMAN 012 ------------------------------------------------- //

// ------------------------------------------------- DOCTOR MAN 013 ------------------------------------------------- //

let doctorM013Model;
let doctorM013Clips;
let doctorM013Mixer;

const doctorMan013 = () => {
    
    new GLTFLoader( loadingManager ).load( DoctorMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '013';
            boxModel.position.set( 6.75, -21, 6.75 );
            boxModel.rotateY( -5.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        doctorM013Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        doctorM013Clips = gltf.animations;
        doctorM013Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( doctorM013Clips, 'idle' );
        const action = doctorM013Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

doctorMan013();

// ------------------------------------------------- DOCTOR MAN 013 ------------------------------------------------- //

// ------------------------------------------------- FIRE MAN 014 ------------------------------------------------- //

let fireM014Model;
let fireM014Clips;
let fireM014Mixer;

const fireMan014 = () => {
    
    new GLTFLoader( loadingManager ).load( FireMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '014';
            boxModel.position.set( 3.5, -21, -8.5 );
            boxModel.rotateY( -3.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        fireM014Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        fireM014Clips = gltf.animations;
        fireM014Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( fireM014Clips, 'idle' );
        const action = fireM014Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

fireMan014();

// ------------------------------------------------- FIRE MAN 014 ------------------------------------------------- //

// ------------------------------------------------- NURSE WOMAN 015 ------------------------------------------------- //

let nurseW015Model;
let nurseW015Clips;
let nurseW015Mixer;

const nurseWoman015 = () => {
    
    new GLTFLoader( loadingManager ).load( NurseWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '015';
            boxModel.position.set( -3.75, -21, 8.75 );
            boxModel.rotateY( 6 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        nurseW015Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        nurseW015Clips = gltf.animations;
        nurseW015Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( nurseW015Clips, 'idle' );
        const action = nurseW015Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

nurseWoman015();

// ------------------------------------------------- NURSE WOMAN 015 ------------------------------------------------- //

// ------------------------------------------------- POLICE MAN 016 ------------------------------------------------- //

let policeM016Model;
let policeM016Clips;
let policeM016Mixer;

const policeMan016 = () => {
    
    new GLTFLoader( loadingManager ).load( PoliceMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '016';
            boxModel.position.set( 3.75, -21, 8.75 );
            boxModel.rotateY( -6 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        policeM016Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        policeM016Clips = gltf.animations;
        policeM016Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( policeM016Clips, 'idle' );
        const action = policeM016Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

policeMan016();

// ------------------------------------------------- POLICE MAN 016 ------------------------------------------------- //

// ------------------------------------------------- RESIDENT WOMAN 017 ------------------------------------------------- //

let residentW017Model;
let residentW017Clips;
let residentW017Mixer;

const residentWoman017 = () => {
    
    new GLTFLoader( loadingManager ).load( ResidentWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '017';
            boxModel.position.set( -3.75, -21, -8.75 );
            boxModel.rotateY( 3.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        residentW017Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        residentW017Clips = gltf.animations;
        residentW017Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( residentW017Clips, 'idle' );
        const action = residentW017Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

residentWoman017();

// ------------------------------------------------- RESIDENT WOMAN 017 ------------------------------------------------- //

// ------------------------------------------------- JANICE WOMAN 018 ------------------------------------------------- //

let janiceW018Model;
let janiceW018Clips;
let janiceW018Mixer;

const janiceWoman018 = () => {
    
    new GLTFLoader( loadingManager ).load( JaniceWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '018';
            boxModel.position.set( -8.75, -21, 3.75 );
            boxModel.rotateY( 5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        janiceW018Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        janiceW018Clips = gltf.animations;
        janiceW018Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( janiceW018Clips, 'idle' );
        const action = janiceW018Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

janiceWoman018();

// ------------------------------------------------- JANICE WOMAN 018 ------------------------------------------------- //

// ------------------------------------------------- MORGAN MAN 019 ------------------------------------------------- //

let morganM019Model;
let morganM019Clips;
let morganM019Mixer;

const morganMan019 = () => {
    
    new GLTFLoader( loadingManager ).load( MorganMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '019';
            boxModel.position.set( 8.75, -21, -3.75 );
            boxModel.rotateY( -4.25 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        morganM019Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        morganM019Clips = gltf.animations;
        morganM019Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( morganM019Clips, 'idle' );
        const action = morganM019Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

morganMan019();

// ------------------------------------------------- MORGAN MAN 019 ------------------------------------------------- //

// ------------------------------------------------- CAPTAIN MAN 020 ------------------------------------------------- //

let captainM020Model;
let captainM020Clips;
let captainM020Mixer;

const captainMan020 = () => {
    
    new GLTFLoader( loadingManager ).load( CaptainMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '020';
            boxModel.position.set( -8.75, -21, -3.75 );
            boxModel.rotateY( 4.5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        captainM020Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        captainM020Clips = gltf.animations;
        captainM020Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( captainM020Clips, 'idle' );
        const action = captainM020Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

captainMan020();

// ------------------------------------------------- CAPTAIN MAN 020 ------------------------------------------------- //

// ------------------------------------------------- SHIMA WOMAN 021 ------------------------------------------------- //

let shimaW021Model;
let shimaW021Clips;
let shimaW021Mixer;

const shimaWoman021 = () => {
    
    new GLTFLoader( loadingManager ).load( ShimaWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '021';
            boxModel.position.set( 8.75, -21, 3.75 );
            boxModel.rotateY( -5 );
            objects.push( boxModel );
            
        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        shimaW021Model = boxModel.add( cloneAsset );
    
        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        shimaW021Clips = gltf.animations;
        shimaW021Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( shimaW021Clips, 'idle' );
        const action = shimaW021Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

shimaWoman021();

// ------------------------------------------------- SHIMA WOMAN 021 ------------------------------------------------- //

// ------------------------------------------------- SHELBY MAN 022 ------------------------------------------------- //

let shelbyM022Model;
let shelbyM022Clips;
let shelbyM022Mixer;

const shelbyMan022 = () => {
    
    new GLTFLoader( loadingManager ).load( ShelbyMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '022';
            boxModel.position.set( 9.5, -21, 0 );
            boxModel.rotateY( 1.5 );
            objects.push( boxModel );

        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        shelbyM022Model = boxModel.add( cloneAsset );

        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        shelbyM022Clips = gltf.animations;
        shelbyM022Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( shelbyM022Clips, 'idle' );
        const action = shelbyM022Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

shelbyMan022();

// ------------------------------------------------- SHELBY MAN 022 ------------------------------------------------- //

// ------------------------------------------------- NUN WOMAN 023 ------------------------------------------------- //

let nunW023Model;
let nunW023Clips;
let nunW023Mixer;

const nunWoman023 = () => {
    
    new GLTFLoader( loadingManager ).load( NunWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '023';
            boxModel.position.set( -9.5, -21, 0 );
            boxModel.rotateY( -1.5 );
            objects.push( boxModel );

        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        nunW023Model = boxModel.add( cloneAsset );

        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        nunW023Clips = gltf.animations;
        nunW023Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( nunW023Clips, 'idle' );
        const action = nunW023Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

nunWoman023();

// ------------------------------------------------- NUN WOMAN 023 ------------------------------------------------- //

// ------------------------------------------------- MONK MAN 024 ------------------------------------------------- //

let monkMan024Model;
let monkMan024Clips;
let monkMan024Mixer;

const monkMan024 = () => {
    
    new GLTFLoader( loadingManager ).load( MonkMan.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '024';
            boxModel.position.set( 0, -21, 9.5 );
            boxModel.rotateY( 0 );
            objects.push( boxModel );

        let cloneAsset = gltf.scene;
        scene.add( boxModel );
        boxModel.add( cloneAsset );
        monkMan024Model = boxModel.add( cloneAsset );

        cloneAsset.matrixAutoUpdate = false;
    
        cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
        cloneAsset.traverse( child => { child.frustumCulled = false; } );
    
        monkMan024Clips = gltf.animations;
        monkMan024Mixer = new THREE.AnimationMixer( cloneAsset );
        const clip = THREE.AnimationClip.findByName( monkMan024Clips, 'idle' );
        const action = monkMan024Mixer.clipAction( clip );
        action.play();
    
        // mixer.push( new THREE.AnimationMixer( cloneAsset ) );
        // mixer.forEach( clip => {
        //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
        // });
    
    }, undefined, ( error ) => {
        console.error( error );
    } );
};

monkMan024();

// ------------------------------------------------- MONK MAN 024 ------------------------------------------------- //

// ------------------------------------------------- MODELS ------------------------------------------------- //




// ------------------------------------------------- HDR TEXTURES ------------------------------------------------- //

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

const hdrTextures = () => {

    rgbeLoader.load( hdrTextureURL, ( texture ) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });
};

// ------------------------------------------------- HDR TEXTURES ------------------------------------------------- //




// ------------------------------------------------- TRANSFORM CONTROLS ------------------------------------------------- //

tControlPos = new TransformControls( camera, renderer.domElement );
tControlSca = new TransformControls( camera, renderer.domElement );
tControlRot = new TransformControls( camera, renderer.domElement );

tControlPos.showY = false;
tControlRot.showX = false;
tControlRot.showZ = false;
tControlPos.size = 0.4;
tControlRot.size = 0.6;

tControlPos.addEventListener( 'dragging-changed', event => {
    orbit.enabled = !event.value;
});

tControlSca.addEventListener( 'dragging-changed', event => {
    orbit.enabled = !event.value;
});

tControlRot.addEventListener( 'dragging-changed', event => {
    orbit.enabled = !event.value;
});

window.addEventListener('click', () => {

    scene.add( tControlPos );
    tControlPos.setMode( 'translate' );

    scene.add( tControlRot );
    tControlRot.setMode( 'rotate' );

});

// ------------------------------------------------- TRANSFORM CONTROLS ------------------------------------------------- //




// ------------------------------------------------- RAYCASTER ------------------------------------------------- //

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let intersects, intersectObject;
let soldierW001Mixs = [],
    tifaG002Mixs = [],
    colombianG003Mixs = [],
    cloudB004Mixs = [],
    africanB005Mixs = [],
    saturnB006Mixs = [],
    mikaelaW007Mixs = [],
    akitoM008Mixs = [],
    terryM009Mixs = [],
    tifaW010Mixs = [],
    beccaW011Mixs = [],
    valerieW012Mixs = [],
    doctorM013Mixs = [],
    fireM014Mixs = [],
    nurseW015Mixs = [],
    policeM016Mixs = [],
    residentW017Mixs = [],
    janiceW018Mixs = [],
    morganM019Mixs = [],
    captainM020Mixs = [],
    shimaW021Mixs = [],
    shelbyM022Mixs = [],
    nunW023Mixs = [],
    monkMan024Mixs = [];

window.addEventListener( 'click', e => {

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );

    intersects.forEach( intersect => {
        if ( intersect.object.name === 'BOX' ) {
            tControlPos.attach( intersect.object );
            tControlRot.attach( intersect.object );

            intersectObject = intersect.object;
            console.log( intersect.object );
        };

// -------------------------------------------- RAYCASTER MODELS CREATE -------------------------------------------- //

        if ( intersect.object.name2 === '001' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( soldierW001Model );
            clone.position.set( -11, 0, 0 );
            clone.rotateY( 4.75 );
            scene.add( clone );
            objects.push( clone );

            const soldierW001Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( soldierW001Clips, 'idle' );
            const action = soldierW001Mix.clipAction( clip );
            action.play();

            soldierW001Mixs.push( soldierW001Mix );
        };

        if ( intersect.object.name2 === '002' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( tifaG002Model );
            clone.position.set( 11, 0, 0 );
            clone.rotateY( 2.5 );
            scene.add( clone );
            objects.push( clone );

            const tifaG002Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( tifaG002Clips, 'idle' );
            const action = tifaG002Mix.clipAction( clip );
            action.play();

            tifaG002Mixs.push( tifaG002Mix );
        };

        if ( intersect.object.name2 === '003' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( colombianG003Model );
            clone.position.set( 11, 0, 1 );
            clone.rotateY( -0.75 );
            scene.add( clone );
            objects.push( clone );

            const colombianG003Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( colombianG003Clips, 'idle' );
            const action = colombianG003Mix.clipAction( clip );
            action.play();

            colombianG003Mixs.push( colombianG003Mix );
        };

        if ( intersect.object.name2 === '004' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( cloudB004Model );
            clone.position.set( 0, 0, -11 );
            clone.rotateY( -3.75 );
            scene.add( clone );
            objects.push( clone );

            const cloudB004Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( cloudB004Clips, 'idle' );
            const action = cloudB004Mix.clipAction( clip );
            action.play();

            cloudB004Mixs.push( cloudB004Mix );
        };

        if ( intersect.object.name2 === '005' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( africanB005Model );
            clone.position.set( 1, 0, -11 );
            clone.rotateY( -0.5 );
            scene.add( clone );
            objects.push( clone );

            const africanB005Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( africanB005Clips, 'idle' );
            const action = africanB005Mix.clipAction( clip );
            action.play();

            africanB005Mixs.push( africanB005Mix );
        };

        if ( intersect.object.name2 === '006' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( saturnB006Model );
            clone.position.set( 2, 0, -11 );
            clone.rotateY( -1.5 );
            scene.add( clone );
            objects.push( clone );

            const saturnB006Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( saturnB006Clips, 'idle' );
            const action = saturnB006Mix.clipAction( clip );
            action.play();

            saturnB006Mixs.push( saturnB006Mix );
        };

        if ( intersect.object.name2 === '007' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( mikaelaW007Model );
            clone.position.set( -11, 0, 1 );
            clone.rotateY( -3 );
            scene.add( clone );
            objects.push( clone );

            const mikaelaW007Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( mikaelaW007Clips, 'idle' );
            const action = mikaelaW007Mix.clipAction( clip );
            action.play();

            mikaelaW007Mixs.push( mikaelaW007Mix );
        };

        if ( intersect.object.name2 === '008' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( akitoM008Model );
            clone.position.set( 0, 0, 11 );
            clone.rotateY( -3 );
            scene.add( clone );
            objects.push( clone );

            const akitoM008Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( akitoM008Clips, 'idle' );
            const action = akitoM008Mix.clipAction( clip );
            action.play();

            akitoM008Mixs.push( akitoM008Mix );
        };

        if ( intersect.object.name2 === '009' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( terryM009Model );
            clone.position.set( 1, 0, 11 );
            clone.rotateY( 0 );
            scene.add( clone );
            objects.push( clone );

            const terryM009Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( terryM009Clips, 'idle' );
            const action = terryM009Mix.clipAction( clip );
            action.play();

            terryM009Mixs.push( terryM009Mix );
        };

        if ( intersect.object.name2 === '010' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( tifaW010Model );
            clone.position.set( -11, 0, 2 );
            clone.rotateY( -0.75 );
            scene.add( clone );
            objects.push( clone );

            const tifaW010Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( tifaW010Clips, 'idle' );
            const action = tifaW010Mix.clipAction( clip );
            action.play();

            tifaW010Mixs.push( tifaW010Mix );
        };

        if ( intersect.object.name2 === '011' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( beccaW011Model );
            clone.position.set( -11, 0, 3 );
            clone.rotateY( -3.75 );
            scene.add( clone );
            objects.push( clone );

            const beccaW011Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( beccaW011Clips, 'idle' );
            const action = beccaW011Mix.clipAction( clip );
            action.play();

            beccaW011Mixs.push( beccaW011Mix );
        };

        if ( intersect.object.name2 === '012' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( valerieW012Model );
            clone.position.set( -11, 0, 4 );
            clone.rotateY( -2.5 );
            scene.add( clone );
            objects.push( clone );

            const valerieW012Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( valerieW012Clips, 'idle' );
            const action = valerieW012Mix.clipAction( clip );
            action.play();

            valerieW012Mixs.push( valerieW012Mix );
        };

        if ( intersect.object.name2 === '013' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( doctorM013Model );
            clone.position.set( 2, 0, 11 );
            clone.rotateY( -4 );
            scene.add( clone );
            objects.push( clone );

            const doctorM013Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( doctorM013Clips, 'idle' );
            const action = doctorM013Mix.clipAction( clip );
            action.play();

            doctorM013Mixs.push( doctorM013Mix );
        };

        if ( intersect.object.name2 === '014' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( fireM014Model );
            clone.position.set( 3, 0, 11 );
            clone.rotateY( 0.5 );
            scene.add( clone );
            objects.push( clone );

            const fireM014Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( fireM014Clips, 'idle' );
            const action = fireM014Mix.clipAction( clip );
            action.play();

            fireM014Mixs.push( fireM014Mix );
        };

        if ( intersect.object.name2 === '015' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( nurseW015Model );
            clone.position.set( -11, 0, 4 );
            clone.rotateY( 2 );
            scene.add( clone );
            objects.push( clone );

            const nurseW015Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( nurseW015Clips, 'idle' );
            const action = nurseW015Mix.clipAction( clip );
            action.play();

            nurseW015Mixs.push( nurseW015Mix );
        };

        if ( intersect.object.name2 === '016' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( policeM016Model );
            clone.position.set( 4, 0, 11 );
            clone.rotateY( 2.75 );
            scene.add( clone );
            objects.push( clone );

            const policeM016Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( policeM016Clips, 'idle' );
            const action = policeM016Mix.clipAction( clip );
            action.play();

            policeM016Mixs.push( policeM016Mix );
        };

        if ( intersect.object.name2 === '017' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( residentW017Model );
            clone.position.set( -11, 0, 5 );
            clone.rotateY( -1.75 );
            scene.add( clone );
            objects.push( clone );

            const residentW017Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( residentW017Clips, 'idle' );
            const action = residentW017Mix.clipAction( clip );
            action.play();

            residentW017Mixs.push( residentW017Mix );
        };

        if ( intersect.object.name2 === '018' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( janiceW018Model );
            clone.position.set( -11, 0, 6 );
            clone.rotateY( -3.25 );
            scene.add( clone );
            objects.push( clone );

            const janiceW018Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( janiceW018Clips, 'idle' );
            const action = janiceW018Mix.clipAction( clip );
            action.play();

            janiceW018Mixs.push( janiceW018Mix );
        };

        if ( intersect.object.name2 === '019' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( morganM019Model );
            clone.position.set( 5, 0, 11 );
            clone.rotateY( -4.75 );
            scene.add( clone );
            objects.push( clone );

            const morganM019Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( morganM019Clips, 'idle' );
            const action = morganM019Mix.clipAction( clip );
            action.play();

            morganM019Mixs.push( morganM019Mix );
        };

        if ( intersect.object.name2 === '020' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( captainM020Model );
            clone.position.set( 6, 0, 11 );
            clone.rotateY( -1.25 );
            scene.add( clone );
            objects.push( clone );

            const captainM020Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( captainM020Clips, 'idle' );
            const action = captainM020Mix.clipAction( clip );
            action.play();

            captainM020Mixs.push( captainM020Mix );
        };

        if ( intersect.object.name2 === '021' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( shimaW021Model );
            clone.position.set( -11, 0, 7 );
            clone.rotateY( 0.5 );
            scene.add( clone );
            objects.push( clone );

            const shimaW021Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( shimaW021Clips, 'idle' );
            const action = shimaW021Mix.clipAction( clip );
            action.play();

            shimaW021Mixs.push( shimaW021Mix );
        };

        if ( intersect.object.name2 === '022' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( shelbyM022Model );
            clone.position.set( 7, 0, 11 );
            clone.rotateY( 1.5 );
            scene.add( clone );
            objects.push( clone );

            const shelbyM022Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( shelbyM022Clips, 'idle' );
            const action = shelbyM022Mix.clipAction( clip );
            action.play();

            shelbyM022Mixs.push( shelbyM022Mix );
        };

        if ( intersect.object.name2 === '023' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( nunW023Model );
            clone.position.set( -11, 0, 8 );
            clone.rotateY( 3.25 );
            scene.add( clone );
            objects.push( clone );

            const nunW023Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( nunW023Clips, 'idle' );
            const action = nunW023Mix.clipAction( clip );
            action.play();

            nunW023Mixs.push( nunW023Mix );
        };

        if ( intersect.object.name2 === '024' ) {
            tControlPos.detach( intersect.object );
            tControlRot.detach( intersect.object );

            const clone = SkeletonUtils.clone( monkMan024Model );
            clone.position.set( 8, 0, 11 );
            clone.rotateY( 3.25 );
            scene.add( clone );
            objects.push( clone );

            const monkMan024Mix = new THREE.AnimationMixer( clone );
            const clip = THREE.AnimationClip.findByName( monkMan024Clips, 'idle' );
            const action = monkMan024Mix.clipAction( clip );
            action.play();

            monkMan024Mixs.push( monkMan024Mix );
        };

// -------------------------------------------- RAYCASTER MODELS CREATE -------------------------------------------- //

    });
});

window.addEventListener( 'mousemove', ( e ) => {

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );

    intersects.forEach( intersect => {
        if ( intersect.object.name === 'GROUND' ) {
            const highLightPos = new THREE.Vector3().copy( intersect.point ).floor().addScalar( 0.5 );
            highLightMesh.position.set( highLightPos.x, 0.01, highLightPos.z );
        };
    });
});

// ------------------------------------------------- RAYCASTER ------------------------------------------------- //




// ------------------------------------------------- DRAG CONTROLS ------------------------------------------------- //

const dcontrol = () => {

    dControl = new DragControls( objects, camera, renderer.domElement );
    
    dControl.addEventListener( 'dragstart', () => {
        orbit.enabled = false;
    });
    
    dControl.addEventListener( 'dragend', event => {
        orbit.enabled = true;
        event.object.position.y = 1;
    });
}

// ------------------------------------------------- DRAG CONTROLS ------------------------------------------------- //




// ------------------------------------------------- PANEL OPTIONS ------------------------------------------------- //

let panel = new dat.GUI( { width: 310 } );
let folder1 = panel.addFolder( 'Controls' ),
    folder2 = panel.addFolder( 'Ambient' );

const options = {
    Intensity: 0.5,
    Translate: true,
    Rotate: true,
    Scale: 1
};

function Translate ( visibility ) {
    tControlPos.showX = visibility;
    tControlPos.showZ = visibility;
};

function Rotate ( visibility ) {
    tControlRot.showY = visibility;
};

folder1.add( options, 'Translate' ).onChange( Translate );
folder1.add( options, 'Rotate' ).onChange( Rotate );
folder1.add( options, 'Scale', 0.05, 2, 0.1 ).listen().onChange( function ( scale ) {
    intersectObject.scale.x = scale; intersectObject.scale.y = scale; intersectObject.scale.z = scale;
});

folder2.add( options, 'Intensity', 0, 1, 0.1 );

// ------------------------------------------------- PANEL OPTIONS ------------------------------------------------- //




// ------------------------------------------------- TEXT SPRITE ------------------------------------------------- //

const deleteText = document.querySelector( '.delete-text' );
deleteText.addEventListener( 'click', () => {

    var filtered = intersectObject.children.filter( ( el ) => { return el.type === 'Sprite'; } ); 
    intersectObject.remove( filtered[0] );
});

const addText = document.querySelector( '.add-text' );
addText.addEventListener( 'click', () => {

    let inputText = prompt( 'Agregar etiqueta' );

    textSprite = generateTextSprite( inputText, {
        fontSize: 120,
        fontColor:'rgba(0, 0, 0, 1)',
    } );
    textSprite.position.set( 0, 2, 0 );
    intersectObject.add( textSprite )
});

// ------------------------------------------------- TEXT SPRITE ------------------------------------------------- //




// ------------------------------------------------- CAMERA ANIMATION ------------------------------------------------- //

// window.addEventListener('mousedown', cameraAnimation );

// const tl = gsap.timeline();
// const duration = 8;
// const ease = 'none';
// let animationIsFinished = false;

// function cameraAnimation() {
//     if (!animationIsFinished) {
//         animationIsFinished = true;

//         tl.to(camera.position, {
//             x: 10,
//             duration,
//             ease
//         });

//         tl.to(camera.position, {
//             y: 40,
//             z: 30,
//             duration,
//             ease,
//             onUpdate: function() {
//                 camera.lookAt( 0, 0, 0 );
//             } 
//         }, 8 );
//     }
// }

// ------------------------------------------------- CAMERA ANIMATION ------------------------------------------------- //




// ------------------------------------------------- FINAL RENDERING ------------------------------------------------- //

const clock  = new THREE.Clock();

function animate() {
    
    const delta = clock.getDelta();
    
    ambientLight.intensity = options.Intensity;

    if ( soldierW001Mixer && tifaG002Mixer && 
         colombianG003Mixer && cloudB004Mixer && 
         africanB005Mixer && saturnB006Mixer && 
         mikaelaW007Mixer && akitoM008Mixer && 
         terryM009Mixer && tifaW010Mixer &&
         beccaW011Mixer && valerieW012Mixer && 
         doctorM013Mixer && fireM014Mixer && 
         nurseW015Mixer && policeM016Mixer && 
         residentW017Mixer && janiceW018Mixer && 
         morganM019Mixer && captainM020Mixer && 
         shimaW021Mixer && shelbyM022Mixer && 
         nunW023Mixer && monkMan024Mixer ) {

        soldierW001Mixer.update( delta );
        soldierW001Mixs.forEach( e => { e.update( delta ); } );

        tifaG002Mixer.update( delta );
        tifaG002Mixs.forEach( e => { e.update( delta ); } );

        colombianG003Mixer.update( delta );
        colombianG003Mixs.forEach( e => { e.update( delta ); } );

        cloudB004Mixer.update( delta );
        cloudB004Mixs.forEach( e => { e.update( delta ); } );

        africanB005Mixer.update( delta );
        africanB005Mixs.forEach( e => { e.update( delta ); } );

        saturnB006Mixer.update( delta );
        saturnB006Mixs.forEach( e => { e.update( delta ); } );

        mikaelaW007Mixer.update( delta );
        mikaelaW007Mixs.forEach( e => { e.update( delta ); } );

        akitoM008Mixer.update( delta );
        akitoM008Mixs.forEach( e => { e.update( delta ); } );

        terryM009Mixer.update( delta );
        terryM009Mixs.forEach( e => { e.update( delta ); } );

        tifaW010Mixer.update( delta );
        tifaW010Mixs.forEach( e => { e.update( delta ); } );

        beccaW011Mixer.update( delta );
        beccaW011Mixs.forEach( e => { e.update( delta ); } );

        valerieW012Mixer.update( delta );
        valerieW012Mixs.forEach( e => { e.update( delta ); } );

        doctorM013Mixer.update( delta );
        doctorM013Mixs.forEach( e => { e.update( delta ); } );

        fireM014Mixer.update( delta );
        fireM014Mixs.forEach( e => { e.update( delta ); } );

        nurseW015Mixer.update( delta );
        nurseW015Mixs.forEach( e => { e.update( delta ); } );

        policeM016Mixer.update( delta );
        policeM016Mixs.forEach( e => { e.update( delta ); } );

        residentW017Mixer.update( delta );
        residentW017Mixs.forEach( e => { e.update( delta ); } );

        janiceW018Mixer.update( delta );
        janiceW018Mixs.forEach( e => { e.update( delta ); } );

        morganM019Mixer.update( delta );
        morganM019Mixs.forEach( e => { e.update( delta ); } );

        captainM020Mixer.update( delta );
        captainM020Mixs.forEach( e => { e.update( delta ); } );

        shimaW021Mixer.update( delta );
        shimaW021Mixs.forEach( e => { e.update( delta ); } );

        shelbyM022Mixer.update( delta );
        shelbyM022Mixs.forEach( e => { e.update( delta ); } );

        nunW023Mixer.update( delta );
        nunW023Mixs.forEach( e => { e.update( delta ); } );

        monkMan024Mixer.update( delta );
        monkMan024Mixs.forEach( e => { e.update( delta ); } );

        orbit.update();
        renderer.render( scene, camera );

        // setTimeout( () => { requestAnimationFrame( animate ) }, 1000 / 25 );
    }
};

renderer.setAnimationLoop( animate );

// ------------------------------------------------- FINAL RENDERING ------------------------------------------------- //




// ------------------------------------------------- RESPONSIVE ------------------------------------------------- //

window.addEventListener( 'resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

// ------------------------------------------------- RESPONSIVE ------------------------------------------------- //




// ------------------------------------------------- HELP CODE ------------------------------------------------- //

/*-------

const entityManager = new YUKA.EntityManager();
// const time = new YUKA.Time();
// const time = Clock.time();
// const delta = time.update().getDelta();
// entityManager.update( delta );
// renderer.setAnimationLoop( animate );
ADDING AI

// add a vehicle geometry for the example
// const vehicleGeometry = new THREE.ConeGeometry(0.1 , 0.5, 8);
// const vehicleMaterial = new THREE.MeshNormalMaterial();
// const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
// vehicleMesh.matrixAutoUpdate = false;
// scene.add(vehicleMesh);

// // sync with the vehicle
// const vehicle = new YUKA.Vehicle();
// vehicle.setRenderComponent(vehicleMesh, sync);

// function sync(entity, renderComponent) {
//     renderComponent.matrix.copy(entity.worldMatrix);
// };

// // create a path
// const path = new YUKA.Path();
// // path.add(new YUKA.Vector3(0, 0, 0));
// // path.add(new YUKA.Vector3(-6, 0, 0));
// // path.add(new YUKA.Vector3(-4, 0, -4));
// // path.add(new YUKA.Vector3(0, 0, 0));
// // path.add(new YUKA.Vector3(4, 0, -4));
// // path.add(new YUKA.Vector3(6, 0, 0));
// // path.add(new YUKA.Vector3(4, 0, 4));
// // path.add(new YUKA.Vector3(0, 0, 6));
// // path.loop = true;

// // passing the path to vihecle
// // vehicle.position.copy(path.current());
// // const followPathBehavior = new YUKA.FollowPathBehavior(path, 1);
// // vehicle.steering.add(followPathBehavior);

// // editing physics force
// // const onPathBehavior = new YUKA.OnPathBehavior(path, 1.5, 0);
// // // onPathBehavior.radius = 0.2;
// // vehicle.steering.add(onPathBehavior);

// // speed
// vehicle.maxSpeed = 4;

// const entityManager = new YUKA.EntityManager();
// entityManager.add(vehicle);

// // set a target to follow
// // add a new sphere
// // const targetGeometry = new THREE.SphereGeometry(0.1);
// // const targetMaterial = new THREE.MeshPhongMaterial({ color: 0xFFEA00 });
// // const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
// // targetMesh.matrixAutoUpdate = false;
// // scene.add(targetMesh);

// // set the sphere as the target
// const target = new YUKA.GameEntity();
// // target.setRenderComponent(targetMesh, sync);
// entityManager.add(target);

// // const AlignmentBehavior = new YUKA.SeekBehavior(target.position);
// // vehicle.steering.add(AlignmentBehavior);

// const arriveBehavior = new YUKA.ArriveBehavior(target.position, 2.5, 0.5);
// vehicle.steering.add(arriveBehavior);
// vehicle.position.set(0, 0, 0);

// // crate a random position
// // setInterval(function() {
// //     const x = Math.random() * 13;
// //     const y = Math.random() * 3;
// //     const z = Math.random() * 13;

// //     target.position.set(x, 0, z);
// // }, 2000);

// // make visible the path
// const pathPosition = [];
// for (let i = 0; i < path._waypoints.length; i++) {
//     const waypoint = path._waypoints[i];
//     pathPosition.push(waypoint.x, waypoint.y, waypoint.z);
// }

// const lineGeometry = new THREE.BufferGeometry();
// lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pathPosition, 3));

// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
// const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
// scene.add(lines);

// // setting new interval




// add options to objects in the scene

// 2D Vector
// const rayCaster = new THREE.Raycaster();

// window.addEventListener('click', function() {
//     rayCaster.setFromCamera(mousePosition, camera);

//     const intersects = rayCaster.intersectObjects(scene.children);

//     intersects.forEach((intersect) => {
//         if (intersect.object.name === 'ground') {
//             const highLightPosition = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
//             highLightMesh.position.set(highLightPosition.x, 0, highLightPosition.z);

//             target.position.set(highLightMesh.position.x, 0, highLightMesh.position.z);
//         }
//     })
// });


// creating an object when click
// const mouse = new THREE.Vector2();
// const intersectionPoint = new THREE.Vector3();
// const planeNormal = new THREE.Vector3();
// const planeVector = new THREE.Plane();

// window.addEventListener('mousedown', function (e) {
// //   mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
// //   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
// //   planeNormal.copy(camera.position).normalize();
// //   planeVector.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
// //   rayCaster.setFromCamera(mouse, camera);
// //   rayCaster.ray.intersectPlane(planeVector, intersectionPoint);
//     const objectExist = objects.find(function(object) {
//         return (object.position.x === highLightMesh.position.x)
//         && (object.position.z === highLightMesh.position.z)
//     })

//     const sphereMesh = new THREE.Mesh(
//         new THREE.SphereGeometry(0.125, 30, 30),
//         new THREE.MeshStandardMaterial({
//         color: 0xffea00,
//         metalness: 0,
//         roughness: 0
//         })
//     );
//     const intersects = rayCaster.intersectObjects(scene.children);
//         if (!objectExist) {
//             intersects.forEach(function(intersect) {
//                 if (intersect.object.name === 'ground') {
//                     const sphereClone = sphereMesh.clone();
//                     sphereClone.position.copy(highLightMesh.position);
//                     scene.add(sphereClone);
//                 }
//             });
//         }
// //   scene.add(sphereMesh);
// //   sphereMesh.position.copy(intersectionPoint);
// });

// identifiying id
// const sphereId = sphere.id;




// sLightHelper.update();

// for (let i = 0; i < intersects.length; i++) {
//     if (intersects[i].object.id === sphereId)
//         intersects[i].object.material.color.set(0xFF0000);
        
//         if (intersects[i].object.name === 'theBox') {
//             intersects[i].object.rotation.x = time / 1000;
//             intersects[i].object.rotation.y = time / 1000;
//         }
//     }



// // ------------------------------------------------- CAROUSEL MODELS ------------------------------------------------- //

// let mixor=[]
// const carouselModel = ( model, positionX, positionY, positionZ, rotateY ) => {

//     new GLTFLoader( loadingManager ).load( model.href, function( gltf ) {

//     let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
//         boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
//         boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
//         boxModel.name = 'BOX';
//         boxModel.name2 = '001';
//         boxModel.position.set( positionX, positionY, positionZ );
//         boxModel.rotateY( rotateY );

//     scene.add( boxModel );
//     // objects.push( boxModel );

//     let model3D = gltf.scene;
//         modelClone = model3D

//     boxModel.add( model3D );

//     model3D.matrixAutoUpdate = false;

//     // vehicle.setRenderComponent(model, sync);

//     model3D.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
//     model3D.traverse( child => { child.frustumCulled = false; } );

//     // model.children[0].position.y = -2.5;

//     mixor.push( new THREE.AnimationMixer( gltf.scene ) );

//     mixor.forEach( clip => {
//         clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
//     });

//     // window.addEventListener('mousemove' , function() {
//     //     if ((highLightMesh.position.x === (Math.round(vehicle.position.x * 2))/2) && (highLightMesh.position.z === (Math.round(vehicle.position.z * 2))/2)) {
//     //         action1.stop();
//     //         action2.play();
//     //     }
//     // });
//     }, undefined, ( error ) => {
//         console.error( error );
//     } );
// };

// TOP
// soldierWoman001(); // Nort
//  carouselModel( TifaGirl, 4.55, -20, -4.55, -4 ); 
//  carouselModel( SoldierWoman, -4.55, -20, 4.55, 5.5 ); 
//  carouselModel( TifaGirl, -4.55, -20, -4.55, 4 ); 
//  carouselModel( TifaGirl, 4.55, -20, 4.55, -5.5 ); 
// carouselModel( TifaGirl, 6.5, -20, 0, 1.5 ); // East
// carouselModel( SoldierWoman, -6.5, -20, 0, -1.5 ); // West
// carouselModel( SoldierWoman, 0, -20, 6.5, 0 ); // South

// // BOTTOM
// carouselModel( SoldierWoman, 0, -21, -9.5, -9.5 ); // Nort
//  carouselModel( TifaGirl, 6.75, -21, -6.75, -4 ); 
//  carouselModel( ColombianGirl, -6.75, -21, 6.75, 5.5 ); 
//  carouselModel( SoldierWoman, -6.75, -21, -6.75, 4 ); 
//  carouselModel( SoldierWoman, 6.75, -21, 6.75, -5.5 );
//   carouselModel( ColombianGirl, 3.75, -21, -8.75, -3.5 ); 
//   carouselModel( TifaGirl, -3.75, -21, 8.75, 6 );
//   carouselModel( ColombianGirl, 3.75, -21, 8.75, -6 ); 
//   carouselModel( TifaGirl, -3.75, -21, -8.75, 3.5 ); 
//   carouselModel( TifaGirl, -8.75, -21, 3.75, 5 ); 
//   carouselModel( SoldierWoman, 8.75, -21, -3.75, -4.5 ); 
//   carouselModel( ColombianGirl, -8.75, -21, -3.75, 4.5 ); 
//   carouselModel( TifaGirl, 8.75, -21, 3.75, -5 ); 
// carouselModel( TifaGirl, 9.5, -21, 0, 1.5 ); // East
// carouselModel( ColombianGirl, -9.5, -21, 0, -1.5 ); // West
// carouselModel( TifaGirl, 0, -21, 9.5, 0 ); // South

// ------------------------------------------------- CAROUSEL MODELS ------------------------------------------------- //




// ------------------------------------------------- 3D MODELS ------------------------------------------------- //

// const addModel = ( model ) => {

//         new GLTFLoader( loadingManager ).load( model.href, function( gltf ) {

//         let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
//             boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
//             boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
//             boxModel.name = 'BOX';
//             boxModel.position.set( 0, 0, 0 );

//         scene.add( boxModel );
//         // objects.push( boxModel );

//         let model3D = gltf.scene;

//         boxModel.add( model3D );

//         model3D.matrixAutoUpdate = false;

//         // vehicle.setRenderComponent(model, sync);

//         model3D.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
//         model3D.traverse( child => { child.frustumCulled = false; } );

//         // model3D.children[0].position.y = 1;

//         mixor.push( new THREE.AnimationMixer( gltf.scene ) );

//         mixor.forEach( clip => {
//             clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
//         });

//         // window.addEventListener('mousemove' , function() {
//         //     if ((highLightMesh.position.x === (Math.round(vehicle.position.x * 2))/2) && (highLightMesh.position.z === (Math.round(vehicle.position.z * 2))/2)) {
//         //         action1.stop();
//         //         action2.play();
//         //     }
//         // });
//     }, undefined, ( error ) => {
//         console.error( error );
//     } );
// };

// addModel( SoldierWoman );
// addModel( TifaGirl );

// ------------------------------------------------- 3D MODELS ------------------------------------------------- //



// ------------------------------------------------- SKELETON UTILS ------------------------------------------------- //

    // const assetLoader = new GLTFLoader( loadingManager );
    // let Clone;
    // let clips;

    // assetLoader.load( TifaGirl.href, function( gltf ) {

    //     let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
    //         boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } ),
    //         boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
    //         boxModel.name = 'BOX';

    //     let cloneAsset = gltf.scene;

    //     scene.add( boxModel );
    //     Clone = boxModel.add( cloneAsset );

    //     cloneAsset.matrixAutoUpdate = false;

    //     cloneAsset.traverse( node => { if ( node.isMesh ) node.castShadow = true; } );
    //     cloneAsset.traverse( child => { child.frustumCulled = false; } );

    //     clips = gltf.animations;
    //     mixer = new THREE.AnimationMixer( cloneAsset );
    //     const clip = THREE.AnimationClip.findByName( clips, 'idle' );
    //     const action = mixer.clipAction( clip );
    //     action.play();

    //     // mixer.push( new THREE.AnimationMixer( cloneAsset ) );

    //     // mixer.forEach( clip => {
    //     //     clip.clipAction( THREE.AnimationClip.findByName( gltf.animations, 'idle' ) ).play();
    //     // });
    // }, undefined, ( error ) => {
    //     console.error( error );
    // } ); 

// ------------------------------------------------- SKELETON UTILS ------------------------------------------------- //


let sprite = new TextSprite( {
    text: 'Text must',
    alignment: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 1,
    padding: 0,
    color: '#ffffff' 
} );
scene.add( sprite );
console.log( sprite )


        // const fontLoader = new FontLoader();
        // const ttfLoader = new TTFLoader();
        // ttfLoader.load( InterTight.href, ( json ) => {
        //     const interTightFont = fontLoader.parse( json );
        //     const textGeometry = new TextGeometry( 'hello world', {
        //         size: 1,
        //         height: 0.1,
        //         font: interTightFont
        //     } );
        //     const textMaterial = new THREE.MeshNormalMaterial();
        //     const textMesh = new THREE.Mesh( textGeometry, textMaterial );
        //     boxModel.add( textMesh );
        // } );

        // let sprite = new TextSprite( {
        //     alignment: 'center',
        //     backgroundColor: 'rgba(0,0,0,1)',
        //     color: '#fff',
        //     fontSize: 1,
        //     lineGap: 1,
        //     padding: 1,
        //     strokeColor: '#fff',
        //     strokeWidth: 0,
        //     text: 'El Padre',
        //   } );
        //   boxModel.add( sprite );

-------*/

// ------------------------------------------------- HELP CODE ------------------------------------------------- //