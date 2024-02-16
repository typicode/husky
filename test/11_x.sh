#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# Test core.hooksPath
expect_hooksPath_to_be ".husky/_"

# Test pre-commit
git add package.json
echo -n one > one.js
echo -n two > two.js
echo -n three > three.js
echo -n "four" > "fo ur.js" # Test file with space

git add one.js two.js "fo ur.js" package.json

cat >.husky/replace_content <<EOL
#!/bin/sh
for f in "\$@"; do
	echo "replace \$f"
	echo " ok" >> "\$f"
done
EOL
chmod +x .husky/replace_content

cat >.husky/pre-commit <<EOL
x "\.js$" .husky/replace_content
EOL

git commit -m foo

# One
if grep -q "one ok" one.js; then
	ok "one.js has been modified"
else
	error "one.js has not been modified"
fi

# Two
if grep -q "two ok" two.js; then
	ok "two.js has been modified"
else
	error "two.js has not been modified"
fi

# Three
if grep -q "^three$" three.js; then
	ok "three.js has not been modified"
else
	error "three.js has been modified"
fi

# Four
if grep -q "four ok" "fo ur.js"; then
	ok "four.js has been modified"
else
	error "four.js has not been modified"
fi

# Package.json
if grep -q "ok" package.json; then
	error "package.json has been modified"
else
	ok "package.json has not been modified"
fi