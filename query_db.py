import sqlite3

conn = sqlite3.connect(r'c:\Users\0731g\nazifyosufi\prisma\dev.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
print("TABLES:", tables)

for (table_name,) in tables:
    try:
        cursor.execute(f'SELECT * FROM "{table_name}"')
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        for r in rows:
            r_str = str(r)
            if 'مهدوی' in r_str or 'mahdav' in r_str.lower() or 'ideology' in r_str.lower() or '.org' in r_str.lower():
                print(f"\n--- MATCH IN TABLE: {table_name} ---")
                for col_name, val in zip(columns, r):
                    if val:
                        print(f"  {col_name}: {val}")
    except Exception as e:
        print("Error reading", table_name, e)
