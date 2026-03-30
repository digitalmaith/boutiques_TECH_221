import prisma from './src/config/prisma.js';

async function main() {
  try {
    // Test de connexion à la base de données
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    console.log('✅ Connexion à la base de données réussie');
    console.log('Résultat de la requête:', result); // [{ result: 2 }]
    
    // Test de récupération de données depuis la base de données
    const magasins = await prisma.magasin.findMany({
      take: 5, // Récupère maximum 5 enregistrements
      orderBy: { createdAt: 'desc' } // Trie par date de création décroissante
    });
    
    console.log('\n✅ Données récupérées depuis la table Magasin:');
    console.log(magasins);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();