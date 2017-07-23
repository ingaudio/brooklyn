

# Clone Remote Repository (just first time)
git clone <GITHUB>


# Create New Feature (aka feature-branch)
git checkout -b <branch_name>

# Check available branch
git branch

# Select branch
git checkout <branch_name>

# Update master branch (not the feature branch)
git checkout master (use the master branch)
git pull (download data from repository)

# Update feature brache with master branch versione (rebase)
git checkout <feature_branch>
git rebase master
(collision to fix)

# Promote feature to master and remote
git checkout <feature_branch>
git rebase master
git checkout master
git merge --squash <feature_branch> (condese all commit in one)
(collision to fix)
git pull



