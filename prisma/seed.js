import prisma from "../src/config/prisma.js";

async function seed() {
  await prisma.$transaction([
    prisma.vente.deleteMany(),
    prisma.employe.deleteMany(),
    prisma.produit.deleteMany(),
    prisma.magasin.deleteMany(),
  ]);

  await prisma.magasin.createMany({
    data: [
      { nom: "Tech Center", adresse: "12 Rue des Lilas", ville: "Dakar" },
      { nom: "Smart Zone", adresse: "45 Avenue Bourguiba", ville: "Thiès" },
      { nom: "Digital Hub", adresse: "8 Boulevard Kennedy", ville: "Saint-Louis" },
    ],
  });

  await prisma.produit.createMany({
    data: [
      { libelle: "Clavier Mecanique", prix: 35000, qteStock: 20 },
      { libelle: "Souris Sans Fil", prix: 12000, qteStock: 40 },
      { libelle: "Ecran 24 pouces", prix: 95000, qteStock: 12 },
      { libelle: "Casque Audio", prix: 18000, qteStock: 25 },
    ],
  });

  const magasins = await prisma.magasin.findMany({ orderBy: { id: "asc" } });
  const produits = await prisma.produit.findMany({ orderBy: { id: "asc" } });

  await prisma.employe.createMany({
    data: [
      {
        prenom: "Awa",
        nom: "Ndiaye",
        poste: "Manager",
        telephone: "770000001",
        magasinId: magasins[0].id,
      },
      {
        prenom: "Moussa",
        nom: "Diop",
        poste: "Vendeur",
        telephone: "770000002",
        magasinId: magasins[0].id,
      },
      {
        prenom: "Fatou",
        nom: "Seck",
        poste: "Caissier",
        telephone: "770000003",
        magasinId: magasins[1].id,
      },
      {
        prenom: "Cheikh",
        nom: "Fall",
        poste: "Vendeur",
        telephone: "770000004",
        magasinId: magasins[2].id,
      },
    ],
  });

  const employes = await prisma.employe.findMany({ orderBy: { id: "asc" } });

  const ventes = [
    { employeId: employes[1].id, produitId: produits[0].id, quantite: 1, daysAgo: 2 },
    { employeId: employes[2].id, produitId: produits[1].id, quantite: 3, daysAgo: 1 },
    { employeId: employes[3].id, produitId: produits[2].id, quantite: 1, daysAgo: 4 },
    { employeId: employes[1].id, produitId: produits[3].id, quantite: 2, daysAgo: 0 },
  ];

  for (const vente of ventes) {
    const produit = produits.find((p) => p.id === vente.produitId);
    const dateVente = new Date();
    dateVente.setDate(dateVente.getDate() - vente.daysAgo);

    await prisma.vente.create({
      data: {
        dateVente,
        quantite: vente.quantite,
        montantTotal: produit.prix * vente.quantite,
        employeId: vente.employeId,
        produitId: vente.produitId,
      },
    });
  }
}

seed()
  .then(async () => {
    console.log("Seed terminee avec succes.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erreur pendant le seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
