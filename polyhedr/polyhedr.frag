#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec3 DrawPosition;
in vec4 DrawColor;

void main() {
    o_color = DrawColor;
}