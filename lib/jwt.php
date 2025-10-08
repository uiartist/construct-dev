<?php
class SimpleJWT {
    private static $secret = "your_secret_key"; // change this!

    public static function encode($payload, $exp = 3600) {
        $header = ['typ' => 'JWT', 'alg' => 'HS256'];
        $payload['iat'] = time();
        $payload['exp'] = time() + $exp;

        $segments = [];
        $segments[] = self::base64UrlEncode(json_encode($header));
        $segments[] = self::base64UrlEncode(json_encode($payload));
        $signing_input = implode('.', $segments);
        $signature = hash_hmac('sha256', $signing_input, self::$secret, true);
        $segments[] = self::base64UrlEncode($signature);

        return implode('.', $segments);
    }

    public static function decode($jwt) {
        $tokens = explode('.', $jwt);
        if (count($tokens) != 3) return null;

        list($header64, $payload64, $signature64) = $tokens;
        $signing_input = $header64 . '.' . $payload64;
        $signature = self::base64UrlDecode($signature64);

        $expected = hash_hmac('sha256', $signing_input, self::$secret, true);
        if (!hash_equals($expected, $signature)) return null;

        $payload = json_decode(self::base64UrlDecode($payload64), true);

        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null; // expired
        }

        return $payload;
    }

    private static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}