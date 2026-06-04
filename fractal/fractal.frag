#version 300 es
precision highp float;
layout (location = 0) out vec4 o_color;

in vec2 DrawCoord;

uniform float u_time;
uniform int u_fractal_type;
uniform vec2 u_offset;
uniform float u_zoom;
uniform vec3 u_color1;
uniform vec3 u_color2;

float lenght(vec2 A) {
    return A.x * A.x - A.y * A.y;
}

vec2 mul(vec2 A, vec2 B) {
    return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.y * B.x);
}

float julia(vec2 Z, vec2 C) {
    int n = 0;
    while (lenght(Z) < 2.0 && n < 128)
    Z = mul(Z, Z) + C, n++;
    return float(n) / 128.0;
}

float mondel(vec2 Z) {
    return julia(Z, Z);
}

void main() {
    float cc;

    if (u_fractal_type == 0)
    cc = julia((DrawCoord + u_offset) / u_zoom, mix(vec2(0.1, 0.1), vec2(0.365, 0.365), abs(sin(u_time / 100.0))));
    else
    cc = mondel((DrawCoord + u_offset) / u_zoom);

    if (cc >= 0.91)
    o_color = vec4(0, 0, 0, 1);
    else
    o_color = vec4(mix(u_color1, u_color2, DrawCoord.x + DrawCoord.y * sin(u_time / 100.0)) * cc, 1.0);
}