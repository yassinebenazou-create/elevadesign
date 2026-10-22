# Eleva Design — stratégie SEO orientée demandes de devis

21 octobre 2026. Priorités exprimées par le client : **habillage mural Maroc**, **dressing Maroc**, **cuisine Maroc**.

L'objectif est de générer des demandes de devis provenant de recherches de services, en complément des recherches sur le nom Eleva Design. La correction technique prépare l'indexation ; elle ne suffit pas à démontrer la pertinence de chaque prestation ou à garantir une position.

## Diagnostic avant les ajouts

- Un projet `/projets/habillage-mural` existe. Le service est aussi mentionné dans `/services/decoration-interieure`, mais il n'a pas de page de prestation dédiée.
- Le dressing apparaît dans le formulaire et certaines pages générales, sans page de service dédiée.
- `/services/cuisine-salon` cible l'aménagement de l'espace cuisine/salon. Elle ne décrit pas explicitement une offre complète de fabrication/pose de cuisines équipées.
- Les trois sujets ont donc une couverture inégale. Ajouter ces mots dans toutes les pages ou dans une balise meta keywords ne répondrait pas au besoin.

## Intentions de recherche observées

L'échantillon de recherche du 21 octobre fait apparaître des pages commerciales spécialisées : matériaux et applications pour l'habillage mural, conception/pose pour les dressings, projets et demande de devis pour les cuisines. Exemples consultés : [Orac Maroc](https://www.oracmaroc.com/habillage-mural), [Panolux](https://panolux.ma/dressing-sur-mesure-maroc/), [Sanikis](https://sanikis.ma/fr/cuisines). Il s'agit d'observations de pages trouvées, pas d'une mesure exhaustive des positions Google au Maroc.

Hypothèse de travail : des pages de prestation précises, illustrées par des projets réels et correspondant à l'offre effective d'Eleva Design répondraient mieux à ces recherches. Aucune estimation de volume, difficulté ou trafic n'est inventée. Les données Search Console et, si disponible, Keyword Planner devront affiner les priorités.

## Offre confirmée et pages préparées localement

Le 21 octobre, le représentant du projet a confirmé **conception, fabrication et pose, dans toutes les villes du Maroc, avec Casablanca en priorité**. Les trois pages ci-dessous sont maintenant implémentées dans le modèle de service existant. Aucun déploiement ni push n'a été effectué. Casablanca apparaît dans le titre, le H1 et le contenu ; la couverture nationale est précisée sans créer de pages artificielles par ville.

| Priorité | Groupe de recherches | Page préparée | Décision éditoriale |
| --- | --- | --- | --- |
| 1 | habillage mural Casablanca ; habillage mural Maroc ; habillage mur TV | `/services/habillage-mural` | Offre de conception/fabrication/pose reliée au projet mural existant, sans inventer ses matériaux ou son lieu précis. |
| 2 | dressing sur mesure Casablanca ; dressing Maroc ; aménagement dressing | `/services/dressing-sur-mesure` | Organisation du rangement, dimensions, fabrication et pose. Illustration d'ambiance explicitement signalée ; aucune réalisation de dressing inventée. |
| 3 | cuisine sur mesure Casablanca ; cuisine sur mesure Maroc ; aménagement cuisine | `/services/cuisine-sur-mesure` | Implantation et mobilier, fabrication et pose. Préserver `/services/cuisine-salon` pour la liaison cuisine ouverte/salon. Électroménager inclus seulement selon le devis. |

« Cuisine Maroc » peut désigner la gastronomie. Les formulations commerciales plus précises sont donc privilégiées pour des demandes de devis. « Cuisine équipée Maroc » reste une piste à mesurer ; la fourniture d'électroménager n'est pas présumée.

Ces pages restent locales pour revue. Les URLs déjà présentes sont conservées. Les nouvelles pages sont reliées depuis Services et le portfolio, entre services connexes et aux projets pertinents. Elles entrent automatiquement dans le prerendering et le sitemap, avec une seule chaîne de génération des métadonnées et du JSON-LD.

## Contenu nécessaire pour chaque page

1. Un titre et un H1 propres au service, avec Maroc ou une zone réellement desservie. Exemple conditionnel : `Dressing sur mesure au Maroc | Eleva Design`.
2. Une introduction qui précise pour qui est la prestation et ce qui est inclus : étude, conception 3D, fourniture, fabrication, installation ou suivi, uniquement selon confirmation.
3. Des photos ou rendus propres à Eleva Design, avec distinction claire entre projet réalisé et visualisation. Décrire le besoin, les contraintes et la solution ; ne pas inventer la ville, les matériaux, les résultats ou le client.
4. Les options réellement disponibles et le déroulement d'une demande. Expliquer les facteurs du devis ; publier des fourchettes de prix seulement si le client les valide.
5. Une FAQ utile : dimensions nécessaires, relevé sur place, prestations incluses, entretien, zones d'intervention et délais confirmés. Pas de texte générique répété entre les trois pages.
6. Un accès visible au formulaire et à WhatsApp. Conserver la présentation et les animations actuelles.
7. Des liens depuis `/services`, les pages connexes et les projets pertinents, dans les deux sens. Le projet mural et sa page de service doivent se compléter : étude de cas d'un côté, offre commerciale de l'autre.
8. Prerendering, canonical propre, metadata, Service et BreadcrumbList dans le mécanisme existant, sans ajouter un second composant SEO ou dupliquer le JSON-LD.

## Référencement local et preuves

- Couverture confirmée : tout le Maroc, Casablanca prioritaire. Cela décrit une zone de service et ne constitue pas la preuve d'un bureau ou showroom dans chaque ville.
- Commencer par des zones d'intervention clairement décrites. Une page par ville n'est justifiée que par une offre et des informations locales distinctes ; pas de dizaines de variantes avec seulement le nom de ville remplacé.
- Si l'entreprise est éligible, compléter sa fiche Google Business Profile avec ses informations réelles et sa zone de service. Ne pas inventer de showroom/adresse.
- Demander des avis authentiques à de vrais clients et publier des projets vérifiables ; aucun achat d'avis, réseau artificiel de liens ou garantie de première position.

## Ordre de travail et mesure

**Étape 1 — offre validée.** Conception/fabrication/pose et couverture nationale confirmées, Casablanca prioritaire. Les matériaux précis, délais, garanties et références supplémentaires restent à documenter. Le domaine doit fonctionner en HTTPS avant toute migration.

**Étape 2 — trois pages préparées.** Les contenus, liens internes, FAQ, métadonnées et sorties statiques sont prêts pour revue. Ajouter ensuite des photos vérifiées de dressings et de cuisines, accompagnées de détails de projets réels. La livraison des pages n'est pas une promesse de classement.

**Étape 3 — lancer après validation.** Déployer seulement les modifications approuvées ; vérifier les nouvelles URLs, soumettre le sitemap et inspecter les pages dans Search Console. Appliquer le plan de migration du rapport technique après vérification HTTPS.

**Étape 4 — suivre les demandes.** Filtrer Search Console par pays Maroc, pages et groupes de requêtes : `habillage|revêtement mural`, `dressing|placard`, `cuisine équipée|cuisine sur mesure|aménagement cuisine`. Suivre impressions, clics, CTR et position moyenne par groupe. Séparer les recherches de marque des recherches de services. Relier les demandes de devis qualifiées aux pages d'entrée lorsque les outils de mesure sont disponibles ; un clic WhatsApp seul n'est pas une vente.

**Étape 5 — améliorer sur preuves.** À partir des requêtes et questions réelles, enrichir les pages et ajouter des études de cas. Réviser titres/introductions si des impressions pertinentes n'apportent pas de clics. L'absence de données au lancement ne prouve pas un échec : indexation et classement se vérifient dans la durée, sans promesse de position ou de date.

## Informations encore nécessaires

- Éventuel lieu physique vérifié, sans inventer d'adresse ou de showroom.
- Projets/photo/rendus de dressing et de cuisine, avec autorisation de publication.
- Matériaux, délais, garanties et prix que l'entreprise peut effectivement annoncer.
- Accès ou export Search Console, s'il existe, pour fonder la suite sur les requêtes déjà obtenues.

Ces informations permettront d'enrichir les pages préparées et de les différencier par des preuves. Mesurer les résultats après publication et indexation ; aucune première position ou échéance de classement n'est garantie.
