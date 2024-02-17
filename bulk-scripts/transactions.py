import pymongo
import random
from faker import Faker

fake = Faker()

# Lista de monedas
currencies = ['USD', 'GTQ', 'EUR', 'GBP']

# Función para generar transacciones
def generate_transaction(users):
    #pick random user
    from_usr = random.choice(users)
    from_account = random.choice(from_usr['accounts'])

    to_usr = random.choice(users)
    while from_account == to_usr:
        to_usr = random.choice(users)

    to_account = random.choice(from_usr['accounts'])

    transaction = {
        "ammount": round(random.uniform(1, 10000), 2),
        "date": fake.date_this_year().strftime('%Y-%m-%d'),
        "currency": random.choice(currencies),
        "account_from": from_account["account_number"],
        "account_to": to_account["account_number"]
    }
    return transaction

# Conexión a la base de datos MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["bank_database"]

# Recuperar la colección de usuarios
users_collection = db['users']
users = list(users_collection.find())

# Generar transacciones
transactions = [generate_transaction(users) for _ in range(10000)]

# Insertar datos en la colección de transacciones
transactions_collection = db['transactions']
transactions_collection.insert_many(transactions)

print("Datos de transacciones insertados exitosamente en la base de datos MongoDB.")
