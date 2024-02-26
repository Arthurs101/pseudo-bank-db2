import random
from faker import Faker

fake = Faker()

# Lista de tipos de cuentas
account_types = ['monetary', 'savings', 'business']

# Lista de estados de cuenta
account_statuses = ['available', 'suspended', 'freezed']

# Lista de monedas
currencies = ['USD', 'GTQ', 'EUR', 'GBP']

# Lista de países
countries = ['USA', 'Guatemala', 'Spain', 'UK']

# Lista de tipos de sucursales
branch_types = ['big', 'small', 'self-bank', 'online_service']

# Función para generar datos de usuario
def generate_user():
    user = {
        "names": fake.first_name(),
        "lastnames": fake.last_name(),
        "birthdate": fake.date_of_birth(minimum_age=18, maximum_age=90).strftime('%d/%m/%Y'),
        "nationality": fake.country(),
        "credit_score": round(random.uniform(300, 850), 2),
        "user_code": fake.random_number(digits=13),
        "hashed_password": fake.password(),
        "accounts": [],
        "phones": [{
            "number": fake.random_number(digits=8),
            "postal_code": random.choice(['+502', '+1']),
            "brand": random.choice(['tigo', 'claro','at&t'])
        }],
        "adrresses": [{
            "street_name": fake.street_name(),
            "zip_code": fake.zipcode(),
            "city": fake.city()
        }],
        "loans": [],
        "type":"client"
    }
    
    # Generar al menos una cuenta bancaria
    account = {
        "account_number": fake.random_number(digits=13),
        "account_type": random.choice(account_types),
        "balance": round(random.uniform(100, 10000), 2),
        "currency": random.choice(currencies),
        "status": random.choice(account_statuses),
        "created_at": fake.date_this_century().strftime('%d/%m/%Y')
    }
    user["accounts"].append(account)
    
    # Generar cuentas bancarias adicionales
    num_accounts = random.randint(0, 2)
    for _ in range(num_accounts):
        account = {
            "account_number": fake.random_number(digits=13),
            "account_type": random.choice(account_types),
            "balance": round(random.uniform(100, 10000), 2),
            "currency": random.choice(currencies),
            "status": random.choice(account_statuses),
            "created_at": fake.date_this_century().strftime('%d/%m/%Y')
        }
        user["accounts"].append(account)
    
    return user

# Función para generar sucursales
def generate_branch():
    branch = {
        "country": random.choice(countries),
        "street": fake.street_name(),
        "city": fake.city(),
        "zip_code": fake.zipcode(),
        "type": random.choice(branch_types)
    }
    return branch

# Generar sucursales
branches = [generate_branch() for _ in range(200)]

# Guardar en MongoDB (requiere tener MongoDB instalado y corriendo)
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['bank_database']

# Insertar datos de sucursales en la colección de sucursales
branches_collection = db['branches']
branches_collection.insert_many(branches)

# Recuperar los _id de las sucursales
branch_ids = [branch['_id'] for branch in branches]

# Generar usuarios con cuentas bancarias
users = [generate_user() for _ in range(50000)]


#General empleados y admins
for _ in range(200):
    user = generate_user()
    user["type"] = "admin"
    users.append(user)

for _ in range(800):
    user = generate_user()
    user["type"] = "personnel"
    users.append(user)

# Asignar aleatoriamente un _id de sucursal a cada cuenta bancaria generada
for user in users:
    for account in user["accounts"]:
        account["created_in"] = random.choice(branch_ids)

# Insertar datos de usuarios en la colección de usuarios
users_collection = db['users']
users_collection.insert_many(users)

print("Datos insertados exitosamente en la base de datos MongoDB.")
