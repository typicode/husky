#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# Create a custom .git/hooks/pre-commit
mkdir -p .git/hooks
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
echo "custom git hook executed"
exit 0
EOF
chmod +x .git/hooks/pre-commit

# Should execute both husky and original Git hook
git add package.json
echo "echo \"husky hook executed\"" > .husky/pre-commit
output=$(git commit -m "test" 2>&1)
echo "$output" | grep -q "husky hook executed" || error "husky hook should run"
echo "$output" | grep -q "custom git hook executed" || error "custom .git/hooks/pre-commit should run"

rm .git/hooks/pre-commit
