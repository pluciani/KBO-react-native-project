# Aide mémoire BDD

## Optimisation

Pour aider à l'optimisation, on va d'abord construire les différents objets, puis on les liera ensemble. On ne poussera les données dans la base de données qu'une fois qu'on aura tout construit.

## MongoDB

Au final, on aura seulement une seule collection `Enterprises` qui contiendra toutes les informations sur les entreprises.

## Liens

Les tableaux `branches` et `establishments` seront liés à `Enterprises`.

Les clés `address`, `activities`, `contacts` et `denominations` peuvent être liées à `Enterprises`, ou `branches`, ou `establishments`.

## Codes

Certaines valeurs sont en réalité des codes qui peuvent être liés à leur traductions, ceci grâce au csv `code.csv`. Voici ces valeurs :

- `ActivityGroup` dans `activities`
- `Classification` dans `activities`
- `ContactType` dans `contacts`
- `EntityContact` dans `contacts`
- `JuridicalForm` dans `Enterprises`
- `JuridicalSituation` dans `Enterprises`
- `Language` dans `denominations`
- `Nace2003` ou `Nace2008` dans `activities`, selon la `NaceVersion`
- `Status` dans `Enterprises`
- `TypeOfAddress` dans `address`
- `TypeOfDenomination` dans `denominations`
- `TypeOfEnterprise` dans `Enterprises`
