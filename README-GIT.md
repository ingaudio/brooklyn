

##Merge Request Approach

#Switch feature-branch
git checkout dev-gallo

#Update feature_branch with last features
git fetch origin
git rebase origin/master
(!!!conflict to solve!!!)

#Check Status
git status
> On branch dev-x
> Your branch is up-to-date with 'origin/dev-x'.

#Commit Local
git add *
git commit -m "<COMMENT TO USE>"

#Push Remote
git push
on GIT HUB -> Create Pull Request between: master <-> <feature_branch> 

##GIT COMMAND

#Clone Remote Repository (just first time)
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



