# Problème de Permissions Prisma

## Situation

Le serveur Node.js fonctionne correctement et la connexion à la base de données est réussie, mais la migration Prisma échoue avec l'erreur :

```
ERROR: permission denied for schema public
```

## Cause

L'utilisateur 'zeynab' n'a pas les permissions nécessaires pour accéder au schéma 'public' de la base de données 'boutique_tech_221'. Le schéma 'public' est par défaut propriété de l'utilisateur 'postgres'.

## Solutions

### Solution 1 : Connectez-vous en tant que postgres et accordez les permissions

Vous pouvez résoudre ce problème en connectant vous directement en tant que l'utilisateur 'postgres' et en accordant les permissions nécessaires à 'zeynab'.

1. Ouvrez un terminal et exécutez :

```bash
sudo -u postgres psql -d boutique_tech_221
```

2. Lorsque vous êtes connecté, exécutez les commandes suivantes :

```sql
GRANT ALL PRIVILEGES ON SCHEMA public TO zeynab;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zeynab;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zeynab;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO zeynab;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO zeynab;
```

3. Quittez psql en tapant :

```
\q
```

### Solution 2 : Vérifiez la configuration pg_hba.conf

Si la solution 1 ne fonctionne pas, vous devriez vérifier la configuration de votre serveur PostgreSQL dans `/etc/postgresql/[version]/main/pg_hba.conf`.

### Solution 3 : Réinitialisez la base de données

Si rien d'autre ne fonctionne, vous pouvez réinitialiser la base de données et le schéma :

```bash
# Supprimez la base de données existante
sudo -u postgres dropdb boutique_tech_221

# Créez une nouvelle base de données avec l'utilisateur zeynab comme propriétaire
sudo -u postgres createdb -O zeynab boutique_tech_221

# Appliquez la migration
npx prisma migrate deploy
```

## Vérification

Après avoir appliqué la solution 1, vous devriez être en mesure d'appliquer la migration Prisma :

```bash
npx prisma migrate deploy
```

Pour vérifier l'état de la base de données :

```bash
node -e '
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  
  // Vérifiez la connexion
  const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
  console.log("✅ Connexion à la base de données réussie:", result);
  
  // Créez un magasin de test
  try {
    const testMagasin = await prisma.magasin.create({
      data: {
        nom: "Test Magasin",
        adresse: "123 Rue Test",
        ville: "Test Ville"
      }
    });
    console.log("✅ Magasin créé:", testMagasin);
    
    // Supprimez le magasin de test
    await prisma.magasin.delete({ where: { id: testMagasin.id } });
    console.log("✅ Magasin supprimé");
  } catch (error) {
    console.error("❌ Erreur lors de la manipulation des données:", error.message);
  }
  
  await prisma.$disconnect();
}

require("dotenv").config();
main().catch(console.error);
'
```

## Si le problème persiste

Si vous rencontrez toujours des problèmes, n'hésitez pas à consulter :

- La documentation Prisma sur les permissions : https://www.prisma.io/docs/concepts/database-connectors/postgresql#permissions
- Le guide de configuration PostgreSQL : https://www.postgresql.org/docs/current/index.html

Note: Le répertoire `/etc/postgresql/[version]/main/` peut varier selon votre distribution Linux.