#version 300 es
precision highp float;

layout (location = 0) in vec2 a_pos;

out vec2 DrawCoord;

void main() {
    DrawCoord = a_pos;
    gl_Position = vec4(a_pos, 0, 1);
}