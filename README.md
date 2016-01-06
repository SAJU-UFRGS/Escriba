# Escriba
Essa extensão foi desenvolvida com o intuito de facilitar a visualização de processos no site do TJRS (http://www.tjrs.jus.br/busca/?tb=proc). Para usá-la, basta adicionar uma lista de processos a serem verificados e ela automaticamente manterá um histórico local de quais processos já foram vistos e preencherá o campo para que o próximo processo possa ser verificado.

Esse produto foi criado para ajudar o G10 do SAJU-UFRGS com o acompanhamento de processos de jovens em conflito com a lei.

Link da extensão (versão 0.1.1):
https://chrome.google.com/webstore/detail/saju-tjrs-extension/ilignoppjkbabadfnombhbnjhjjgmcio

## Para rodar
### Instalar dependências
`npm install`

### Rodar localmente
Acesse chrome://extensions/ e possibilite "Developer Mode". Escolha "Load unpacked extension" e selecione o diretório aonde o repositório foi clonado. Pronto! O ícone da extensão deverá aparecer no topo do browser.

### Rodar testes
`npm test`

### Outros
`npm run-script lint`
