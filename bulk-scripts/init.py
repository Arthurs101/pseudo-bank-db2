import random
from faker import Faker
from datetime import datetime

fake = Faker()

# Lista de tipos de usuario
user_types = ['client', 'admin', 'personnel']

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
            "brand": random.choice(['tigo', 'claro'])
        }],
        "adrresses": [{
            "street_name": fake.street_name(),
            "zip_code": fake.zipcode(),
            "city": fake.city()
        }],
        "loans": []
    }
    
    # Generar al menos una cuenta bancaria
    account = {
        "account_number": fake.random_number(digits=13),
        "type": random.choice(account_types),
        "balance": round(random.uniform(100, 10000), 2),
        "currency": random.choice(currencies),
        "status": random.choice(account_statuses),
        "created_at": fake.date_this_century().strftime('%d/%m/%Y'),
        "created_in": fake.random_number(digits=8)
    }
    user["accounts"].append(account)
    
    # Generar cuentas bancarias adicionales
    num_accounts = random.randint(0, 2)
    for _ in range(num_accounts):
        account = {
            "account_number": fake.random_number(digits=13),
            "type": random.choice(account_types),
            "balance": round(random.uniform(100, 10000), 2),
            "currency": random.choice(currencies),
            "status": random.choice(account_statuses),
            "created_at": fake.date_this_century().strftime('%d/%m/%Y'),
            "created_in": fake.random_number(digits=8)
        }
        user["accounts"].append(account)
    
    # Generar préstamos
    num_loans = random.randint(0, 2)
    for _ in range(num_loans):
        loan = {
            "ammount": round(random.uniform(1000, 50000), 2),
            "due_date": fake.future_date(end_date='+5y').strftime('%d/%m/%Y'),
            "currency": random.choice(currencies),
            "payments": [],
            "status": random.choice(['payed', 'due', 'active']),
            "interest": round(random.uniform(0, 1), 2),
            "interest_rate": fake.word()
        }
        user["loans"].append(loan)
    
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

# Función para generar transacciones
def generate_transaction(users):
    transaction = {
        "ammount": round(random.uniform(1, 10000), 2),
        "date": fake.date_this_year().strftime('%d/%m/%Y'),
        "currency": random.choice(currencies),
        "from": random.choice(users)['_id'],
        "account_from": random.choice(random.choice(users)['accounts'])['_id'],
        "to": random.choice(users)['_id'],
        "account_to": random.choice(random.choice(users)['accounts'])['_id']
    }
    return transaction

# Generar usuarios admin y personnel
admin_count = 0
personnel_count = 0
admins = []
personnel = []
while admin_count + personnel_count < 1000:
    user = generate_user()
    if user['type'] == 'admin' and admin_count < 100:
        admins.append(user)
        admin_count += 1
    elif user['type'] == 'personnel':
        personnel.append(user)
        personnel_count += 1

# Generar usuarios restantes
remaining_users = [generate_user() for _ in range(1000 - (admin_count + personnel_count))]

# Combinar todos los usuarios
users = admins + personnel + remaining_users

# Generar sucursales
branches = [generate_branch() for _ in range(100)]

# Generar transacciones
transactions = [generate_transaction(users) for _ in range(10000)]

# Guardar en MongoDB (requiere tener MongoDB instalado y corriendo)
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['bank_database']

# Insertar datos en colecciones
users_collection = db['users']
branches_collection = db['branches']
transactions_collection = db['transactions']

users_collection.insert_many(users)
branches_collection.insert_many(branches)
transactions_collection.insert_many(transactions)

print("Datos insertados exitosamente en la base de datos MongoDB.")
