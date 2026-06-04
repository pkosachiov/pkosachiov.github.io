#version 300 es
precision highp float;

in vec3 a_pos;
in vec3 a_color;

uniform mat4 u_model;
uniform mat4 u_view; 
uniform mat4 u_projection;

out vec4 DrawColor;

void main() {
    DrawColor = vec4(a_color, 1.0);
    gl_Position = u_projection * u_view * u_model * vec4(a_pos, 1.0);
}