"""
Nazif Yosufi Portfolio - Python Management & Maintenance Utility
This script allows quick inspection and management of the portfolio database,
environment status, and local development tools.
"""

import os
import sys
import sqlite3

def check_status():
    print("=" * 60)
    print(" Nazif Yosufi - Graphic Designer Portfolio Management")
    print("=" * 60)
    
    base_dir = os.path.dirname(__file__)
    possible_paths = [
        os.path.join(base_dir, "prisma", "dev.db"),
        os.path.join(base_dir, "dev.db"),
    ]
    
    db_path = None
    for p in possible_paths:
        if os.path.exists(p):
            db_path = p
            break
            
    if db_path:
        print(f"[OK] Database file found: {db_path}")
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            cursor.execute("SELECT count(*) FROM Project")
            projects_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM Certificate")
            certs_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM Skill")
            skills_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM Experience")
            exp_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM Service")
            service_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM ContactMessage")
            messages_count = cursor.fetchone()[0]
            
            print(f"    - Total Projects:        {projects_count}")
            print(f"    - Total Certificates:    {certs_count}")
            print(f"    - Total Skills:          {skills_count}")
            print(f"    - Total Career Entries:  {exp_count}")
            print(f"    - Total Services:        {service_count}")
            print(f"    - Total Inquiries:       {messages_count}")
            conn.close()
        except Exception as e:
            print(f"[!] Database query error: {e}")
    else:
        print("[!] Database not found. Run 'npm run db:push' and 'npm run db:seed'.")
    
    print("-" * 60)
    print("Next.js App:    Run 'npm run dev' to start local dev server")
    print("Admin Portal:   http://localhost:3000/admin")
    print("Default Admin:  admin@portfolio.com / Admin@2026!")
    print("=" * 60)

if __name__ == "__main__":
    check_status()

