import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loadingManager = new THREE.LoadingManager();
const scene = new THREE.Scene();

const TifaKid = new URL( '../assets/TifaGirl.glb', import.meta.url );
const ColombianKid = new URL( '../assets/ColombianGirl.glb', import.meta.url );
const SoldierWoman = new URL( '../assets/SoldierWoman.glb', import.meta.url );



// ------------------------------------------------- SOLDIER WOMAN 001 ------------------------------------------------- //

export let soldierW001Model;
export let soldierW001Clips;

export let soldierW001Mixer;
export let boxModel;

export const soldierWoman001 = () => {

    const assetLoader = new GLTFLoader( loadingManager );
    
    assetLoader.load( SoldierWoman.href, function( gltf ) {
    
        let boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, ),
            boxMaterial = new THREE.MeshBasicMaterial( { color: 0xA11AAF, visible: false } );
            boxModel = new THREE.Mesh( boxGeometry, boxMaterial );
            boxModel.name = 'BOX';
            boxModel.name2 = '001';
            boxModel.position.set( 0, -20, -6.5 );
            boxModel.rotateY( -9.5 );
    
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

// ------------------------------------------------- SOLDIER GILD 001 ------------------------------------------------- //