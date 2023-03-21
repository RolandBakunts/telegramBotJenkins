import jenkins.model.Jenkins

import hudson.security.PermissionGroup
import hudson.security.Permission

import com.michelin.cio.hudson.plugins.rolestrategy.RoleBasedAuthorizationStrategy
import com.michelin.cio.hudson.plugins.rolestrategy.Role
import com.synopsys.arc.jenkins.plugins.rolestrategy.RoleType

import org.jenkinsci.plugins.rolestrategy.permissions.PermissionHelper
// Define the name of the new role and its permissions
def roleName = "users-role"
def first_user = "Roland Bakunts"
def second_user = "Aleksandr Slepyntsev"
def permissions = [hudson.model.Hudson.READ, hudson.model.Item.CONFIGURE]

// Create the new role
def role = new Role(roleName, new HashSet<>(permissions))

// Add the role to the global role map
def authStrategy = Jenkins.instance.getAuthorizationStrategy()
if (authStrategy instanceof RoleBasedAuthorizationStrategy) {
    def globalRoleMap = authStrategy.getRoleMaps()[RoleType.Global]
    globalRoleMap.addRole(role)
    globalRoleMap.assignRole(role, first_user)
    globalRoleMap.assignRole(role, second_user)
}

// Save the changes
Jenkins.instance.save()