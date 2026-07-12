# Salutation

Le plugin **Salutation** permet à A.V.A.T.A.R de transmettre des salutations à une personne ou à un groupe.

Il adapte automatiquement la formule de politesse en fonction de l'heure de la journée (bonjour ou bonsoir) et peut également utiliser une salutation explicitement demandée par l'utilisateur.

## Fonctionnalités

- Dire bonjour, bonsoir ou salut à une personne.
- Saluer un groupe ou tout le monde.
- Choisir automatiquement entre « bonjour » et « bonsoir » selon l'heure.
- Utiliser le prénom configuré lorsque aucun destinataire n'est précisé.
- Compatible avec les packs de langues d'A.V.A.T.A.R.

## Exemples

- Bonjour Jean
- Bonsoir Marie
- Salut Paul
- Dis bonjour à Sophie
- Dis bonsoir à tout le monde
- Salut à mes collègues
- Bonjour

## Configuration

Le plugin utilise les paramètres suivants :

- **firstName** : prénom utilisé lorsqu'aucun destinataire n'est indiqué.

Exemple :

```json
{
  "modules": {
    "Salutation": {
      "firstName": "Halim"
    }
  }
}
```

## Remarques

Lorsque aucun destinataire n'est mentionné, A.V.A.T.A.R salue automatiquement l'utilisateur avec le prénom configuré.