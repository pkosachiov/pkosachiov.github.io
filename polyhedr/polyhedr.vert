#version 300 es
precision highp float;

in vec3 a_pos;
in vec3 a_color;
in vec3 a_normal;

uniform mat4 u_model;
uniform mat4 u_view; 
uniform mat4 u_projection;

out vec4 DrawColor;
out vec3 DrawNormal;

void main() {
    DrawColor = vec4(pow(a_color, vec3(1.0 / 2.2)), 1.0);
    DrawNormal = a_normal;
    gl_Position = u_projection * u_view * u_model * vec4(a_pos, 1.0);
}