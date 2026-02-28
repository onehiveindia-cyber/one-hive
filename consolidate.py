import os

# Files to consolidate in specific order
files_to_merge = [
    'index.html',
    'login.html',
    'register.html',
    'forgot-password.html',
    'user-dashboard.html',
    'service.html',
    'track.html',
    'tracking.html',
    'worker-register.html',
    'admin.html',
    'server.js',
    'supabase-init.js',
    'supabase-schema.sql',
    'package.json',
    '.env'
]

output_file = 'ONEHIVE_FULL_CODE.txt'

with open(output_file, 'w', encoding='utf-8') as outfile:
    outfile.write("# OneHive Project - FULL CONSOLIDATED CODEBASE\n")
    outfile.write("="*50 + "\n\n")
    
    for filename in files_to_merge:
        if os.path.exists(filename):
            outfile.write(f"## FILE: {filename}\n")
            outfile.write("-" * 30 + "\n")
            with open(filename, 'r', encoding='utf-8') as infile:
                outfile.write(infile.read())
            outfile.write("\n\n" + "="*50 + "\n\n")
        else:
            outfile.write(f"## FILE: {filename} (NOT FOUND)\n\n")

print(f"Consolidation complete: {output_file}")
