import prisma from "../src/config/prisma.js";

async function seed() {
  await prisma.$transaction([
    prisma.vente.deleteMany(),
    prisma.employe.deleteMany(),
    prisma.produit.deleteMany(),
    prisma.categorie.deleteMany(),
    prisma.magasin.deleteMany(),
  ]);

  const magasinData = [
    { nom: "Tech Center", adresse: "12 Rue des Lilas", ville: "Dakar" },
    { nom: "Smart Zone", adresse: "45 Avenue Bourguiba", ville: "Thiès" },
    { nom: "Digital Hub", adresse: "8 Boulevard Kennedy", ville: "Saint-Louis" },
  ];

  const magasins = [];
  for (const data of magasinData) {
    magasins.push(await prisma.magasin.create({ data }));
  }

  await prisma.categorie.createMany({
    data: [
      { code: "PERI", libelle: "Peripheriques", sousCategorie: "Accessoires" },
      { code: "ECRN", libelle: "Ecrans", sousCategorie: "Moniteurs" },
      { code: "AUDIO", libelle: "Audio", sousCategorie: "Casques" },
    ],
  });

  const categories = await prisma.categorie.findMany({ orderBy: { id: "asc" } });
  const categorieByCode = new Map(categories.map((c) => [c.code, c.id]));

  await prisma.produit.createMany({
    data: [
      {
        libelle: "Clavier Mecanique",
        prix: 35000,
        qteStock: 20,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mechanical_Keyboard.jpg",
        categorieId: categorieByCode.get("PERI"),
      },
      {
        libelle: "Souris Sans Fil",
        prix: 12000,
        qteStock: 40,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Wireless_mouse.jpg",
        categorieId: categorieByCode.get("PERI"),
      },
      {
        libelle: "Ecran 24 pouces",
        prix: 95000,
        qteStock: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Monitor_2.jpg",
        categorieId: categorieByCode.get("ECRN"),
      },
      {
        libelle: "Casque Audio",
        prix: 18000,
        qteStock: 25,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Headphones_2.jpg",
        categorieId: categorieByCode.get("AUDIO"),
      },
    ],
  });

  if (magasins.length < 3) {
    throw new Error("Seed invalide: magasins insuffisants pour créer les employés.");
  }

  const produits = await prisma.produit.findMany({ orderBy: { id: "asc" } });

  await prisma.employe.createMany({
    data: [
      {
        matricule: "EMP-0001",
        prenom: "Awa",
        nom: "Ndiaye",
        poste: "MANAGER",
        telephone: "770000001",
        magasinId: magasins[0].id,
      },
      {
        matricule: "EMP-0002",
        prenom: "Moussa",
        nom: "Diop",
        poste: "VENDEUR",
        telephone: "770000002",
        magasinId: magasins[0].id,
      },
      {
        matricule: "EMP-0003",
        prenom: "Fatou",
        nom: "Seck",
        poste: "CAISSIER",
        telephone: "770000003",
        magasinId: magasins[1].id,
      },
      {
        matricule: "EMP-0004",
        prenom: "Cheikh",
        nom: "Fall",
        poste: "VENDEUR",
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
