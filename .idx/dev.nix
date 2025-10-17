# Para aprender mais sobre como usar o Nix para configurar seu ambiente,
# veja: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Qual canal do nixpkgs usar.
  channel = "stable-24.11"; # ou "unstable"

  # Use https://search.nixos.org/packages para encontrar pacotes
  packages = [ pkgs.nodejs_23 ];

  # Define variáveis de ambiente no espaço de trabalho
  env = { };

  idx = {
    # Pesquise pelas extensões desejadas em https://open-vsx.org/ e use o formato "publisher.id"
    extensions = [
      "astro-build.astro-vscode"
      "unifiedjs.vscode-mdx"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
      "streetsidesoftware.code-spell-checker"
      "streetsidesoftware.code-spell-checker-portuguese-brazilian"
    ];

    workspace = {
      # Executa quando um espaço de trabalho é criado pela primeira vez com este arquivo `dev.nix`
      onCreate = {
        install = ''
          npm ci --prefer-offline --no-audit --no-progress --timing || npm i --no-audit --no-progress --timing
          yes | npx astro add tailwind'';
        # Abre automaticamente os seguintes arquivos (se existirem):
        default.openFiles = [ "src/pages/index.astro" ];
      };
      # Para executar algo toda vez que o espaço de trabalho for iniciado ou reiniciado, use o gancho `onStart`
    };

    # Ativa pré-visualizações e permite personalizar a configuração
    previews = {
      enable = true;
      previews = {
        web = {
          command =
            [ "npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0" ];
          manager = "web";
        };
      };
    };
  };
}
