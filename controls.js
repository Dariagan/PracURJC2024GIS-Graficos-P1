function update(picker, type) {
    switch (type){
        case 1:
            ambientColor[0] = picker.channel('R')/255
            ambientColor[1] = picker.channel('G')/255
            ambientColor[2] = picker.channel('B')/255
            ambientStrength = picker.channel('A')
        break;
        case 2:
            diffuseColor[0] = picker.channel('R')/255
            diffuseColor[1] = picker.channel('G')/255
            diffuseColor[2] = picker.channel('B')/255
            diffuseStrength = picker.channel('A')
        break;
        case 3:
            specularColor[0] = picker.channel('R')/255
            specularColor[1] = picker.channel('G')/255
            specularColor[2] = picker.channel('B')/255
            specularStrength = picker.channel('A')
        break;
        case 4:
            spotLightColor[0] = picker.channel('R')/255
            spotLightColor[1] = picker.channel('G')/255
            spotLightColor[2] = picker.channel('B')/255
            spotLightStrength = picker.channel('A')
        break;
        case 5:
            dirLightColor[0] = picker.channel('R')/255
            dirLightColor[1] = picker.channel('G')/255
            dirLightColor[2] = picker.channel('B')/255
            dirLightStrength = picker.channel('A')
        break;
        case 6:
            pointLightColor[0] = picker.channel('R')/255
            pointLightColor[1] = picker.channel('G')/255
            pointLightColor[2] = picker.channel('B')/255
            pointLightStrength[0] = picker.channel('A')
        break;
        default: console.error("type of light's color to update not handled")
    }
}

document.addEventListener('keydown', function (event) {
    if(event.shiftKey) switch (event.keyCode) {    
        // ***** CAMERA MOVEMENT *****
        // GOING DOWN
        case 32: // shift + space
            vec3.subtract(cameraPos, cameraPos, cameraUp.map(x => x * cameraMovSpeed) )     
            break;

        // ***** LIGHT OPENING *****
        case 80: // shift + P
            shadowAngle += 2.0;
            shadowAngle = Math.min(shadowAngle, cutOffAngle);
            
            console.log("shadowAngle :",shadowAngle);
            break;
        case 77: // shift + M
            shadowAngle -= 2.0;
            shadowAngle = Math.max(shadowAngle, 0.0);

            console.log("shadowAngle :", shadowAngle);
            break;
        case 49:// shift + 1
            specularRadius += 1.0;    
        break;
        case 50:// shift + 2
            specularRadius -= 1.0; specularRadius = Math.max(1.0, specularRadius);
        break;
    }
    else switch (event.keyCode) {
        // ***** CAMERA MOVEMENT *****
        // GOING FORWARD
        case 87: // W
        case 90: // Z
        case 38: // arrow up
            vec3.add(cameraPos, cameraPos, cameraFront.map(x => x * cameraMovSpeed));  
            break;
        // GOING BACKWARD
        case 83: // S
        case 40: // arrow down
            vec3.subtract(cameraPos, cameraPos, cameraFront.map(x => x * cameraMovSpeed));  
            break;
        // GOING LEFT
        case 65: // A
        case 81: // Q
        case 37:{ // arrow left
            let crossProduct = vec3.create();
            vec3.cross(crossProduct, cameraFront, cameraUp);
            vec3.normalize(crossProduct, crossProduct);
            crossProduct = crossProduct.map(x => x * cameraMovSpeed);
            vec3.subtract(cameraPos, cameraPos, crossProduct);
            break;}
        // GOING RIGHT
        case 68: // D
        case 39:{ // arrow right
            let crossProduct = vec3.create();
            vec3.cross(crossProduct, cameraFront, cameraUp);
            vec3.normalize(crossProduct, crossProduct);
            crossProduct = crossProduct.map(x => x * cameraMovSpeed);
            vec3.add(cameraPos, cameraPos, crossProduct);
            break;}
        // GOING UP
        case 32: // space
            vec3.add(cameraPos, cameraPos, cameraUp.map(x => x * cameraMovSpeed))     
            break;
            
        // ***** CAMERA RESET *****
        case 67: // C
            cameraPos = new Float32Array(initialCamPos);
            cameraUp = new Float32Array(initialCamUp);
            yaw = -90.0; pitch = 0.0;
            break;
        // ***** SPOTLIGHT OPENING *****
        case 80: // P
            cutOffAngle += 2.0;
            cutOffAngle = Math.min(180.0, cutOffAngle);
            console.log("cutOffAngle :",cutOffAngle);
            break;
        case 77: // M
            cutOffAngle -= 2.0;
            cutOffAngle = Math.max(shadowAngle, cutOffAngle);
            console.log("cutOffAngle :", cutOffAngle);
            break;
    } 
});

let canvas = document.getElementById('myCanvas');
canvas.style.cursor = 'none';
const rect = canvas.getBoundingClientRect();
let prevMouseX = rect.x / 2; // x-center of the canvas
let prevMouseY = rect.y / 2; // y-center of the canvas
let firstMouseMov = true;

// CAMERA VARIABLES
const sensibility = 0.5
const cameraMovSpeed = sensibility; // in meter per tick
const cameraRotSpeed = sensibility / 3; // in meter per tick
// in degrees
var yaw = -90.0, pitch = 0.0; 

document.addEventListener('mousemove', (event) => {
    const {x, y} = event;
    
    if (firstMouseMov){
        prevMouseX = x;
        prevMouseY = y;
        firstMouseMov = false;
    }
    const xoffset = (x - prevMouseX)*cameraRotSpeed;
    const yoffset = (prevMouseY - y)*cameraRotSpeed; 
    prevMouseX = x;
    prevMouseY = y;

    yaw   += xoffset;
    pitch += yoffset;

    pitch = Math.clamp(pitch, -89.0, 89.0)
})

