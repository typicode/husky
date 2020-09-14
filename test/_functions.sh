# Exit on error
set -eu

# Create $1 and install tgz
function install_tgz {
  tgz="./husky-*.tgz"

  # Create directory
  mkdir -p $1

  # Install
  cp $tgz $1
  cd $1 && npm init -y && npm install $tgz
}

function init_git {
  git init
  git config user.email "test@test"
  git config user.name "test"
}
