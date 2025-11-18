#!/bin/bash

echo "Ì∫Ä Iniciando push duplo..."
echo ""

echo "Ì≥§ Push para GitHub..."
git push github merge-sebrae-frontend
if [ $? -eq 0 ]; then
    echo "‚úÖ GitHub: Push realizado com sucesso!"
else
    echo "‚ùå GitHub: Erro no push"
    exit 1
fi

echo ""
echo "Ì≥§ Push para Sebrae Frontend..."
git push sebrae-frontend merge-sebrae-frontend
if [ $? -eq 0 ]; then
    echo "‚úÖ Sebrae: Push realizado com sucesso!"
else
    echo "‚ùå Sebrae: Erro no push"
    exit 1
fi

echo ""
echo "Ìæâ Push duplo conclu√≠do com sucesso!"
echo "Ì≥ä Reposit√≥rios atualizados:"
echo "   - GitHub: https://github.com/guiguilinha/digital.git"
echo "   - Sebrae: https://git.sebraemg.com.br/maturidade_digital/maturidade_digital_frontend.git"
