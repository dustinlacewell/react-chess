let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-14_x
    pkgs.yarn
    pkgs.nodePackages.prettier
  ];

  shellHook = ''
    alias serve='npx webpack serve'
    alias build='npx webpack'
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}
