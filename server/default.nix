with (import <nixpkgs> {});

rec {
  faye-server = pkgs.yarn2nix-moretea.mkYarnPackage {
    name = "faye-server";
    src = ./.;
    packageJSON = ./package.json;
    yarnLock = ./yarn.lock;
    postInstall = ''
      chmod +x $out/bin/*
    '';
  };
}
