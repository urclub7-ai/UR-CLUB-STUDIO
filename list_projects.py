import sqlite3
import sys
sys.stdout.reconfigure(encoding='utf-8')

conn = sqlite3.connect(r'c:\Users\0731g\nazifyosufi\prisma\dev.db')
cursor = conn.cursor()
cursor.execute('PRAGMA table_info("Project")')
cols = [col[1] for col in cursor.fetchall()]

cursor.execute('SELECT * FROM "Project"')
for row in cursor.fetchall():
    print("--- PROJECT ---")
    for col, val in zip(cols, row):
        if val:
            print(f"  {col}: {val}")
