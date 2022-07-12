<?php

function script_formatter(array $dependencies, string $prefix)
{
    $script = $prefix . ' -W';
    foreach ($dependencies as $package => $version) {
        $script .= " $package";
    }
    var_dump($script);
    return $script;
}
$dir = $argv[1];
$composer = "$dir/composer.json";

if (!file_exists($composer)) {
    var_dump($composer);
    throw new Exception('composer.json not found');
}

var_dump($composer);

$data = (array)json_decode(
    file_get_contents($composer)
);


shell_exec(
    script_formatter((array)$data['require'], 'composer require')
);

if (!empty((array) $data['require-dev'])) {
    shell_exec(
        script_formatter((array)$data['require-dev'], 'composer require --dev')
    );
}
