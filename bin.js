#!/usr/bin/env node
import f, { writeFileSync as w } from 'fs'
import i from './index.js'
import { createInterface } from 'readline'

let p, a, n, s, o, d

p = process
a = p.argv[2]

if (a == 'init') {
    n = 'package.json'
    s = f.readFileSync(n)
    o = JSON.parse(s)
    if (o.scripts && o.scripts.prepare && o.scripts.prepare !== 'husky') { 
        const rl = createInterface({input: process.stdin, output: process.stdout})
        
        console.log(`\nhusky - Found existing prepare script: "${o.scripts.prepare}"`)
        rl.question('What would you like to do?\n1. Override with "husky"\n2. Append "husky" to existing script\n3. Keep existing script\nEnter choice (1-3): ', (answer) => {
            if (answer === '1') {
                o.scripts.prepare = 'husky'
                console.log('husky - Overrode existing prepare script')
            } else if (answer === '2') {
                o.scripts.prepare = `${o.scripts.prepare} && husky`
                console.log('husky - Appended to existing prepare script')
            } else {
                console.log('husky - Kept existing prepare script')
            }
            
            w(n, JSON.stringify(o, 0, /\t/.test(s) ? '\t' : 2) + '\n')
            p.stdout.write(i())
            try { f.mkdirSync('.husky') } catch {}
            w('.husky/pre-commit', (p.env.npm_config_user_agent?.split('/')[0] ?? 'npm') + ' test\n')
            rl.close()
            p.exit()
        })
    } else {
        (o.scripts ||= {}).prepare = 'husky'
        w(n, JSON.stringify(o, 0, /\t/.test(s) ? '\t' : 2) + '\n')
        p.stdout.write(i())
        try { f.mkdirSync('.husky') } catch {}
        w('.husky/pre-commit', (p.env.npm_config_user_agent?.split('/')[0] ?? 'npm') + ' test\n')
        p.exit()
    }
}

d = c => console.error(`husky - ${c} command is DEPRECATED`)
if (['add', 'set', 'uninstall'].includes(a)) { d(a); p.exit(1) }
if (a == 'install') d(a)

p.stdout.write(i(a == 'install' ? undefined : a))