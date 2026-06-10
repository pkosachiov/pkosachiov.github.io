#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec3 DrawPosition;
in vec4 DrawColor;
in vec3 DrawNormal;

void main() {
    o_color = vec4(pow(DrawColor.xyz, vec3(2.2)), 1.0);
}