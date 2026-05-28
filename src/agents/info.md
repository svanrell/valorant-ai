Basic Identification Data

agent.uuid: The global unique identifier of the agent (text).
agent.displayName: The commercial name of the character (e.g. "Gekko", "Fade").
agent.description: The official biography and background of the agent.
agent.developerName: The codename used by developers (e.g. "Aggrobot" for Gekko).

Images and Media (Direct URLs)

agent.displayIcon: Square icon of the face, ideal for lists or avatars.
agent.fullPortrait: High-definition body portrait of the agent without background.
agent.background: Stylized background card shown behind the character in menus.
agent.killfeedPortrait: Small icon that appears top right when the agent eliminates someone.

Agent Role (agent.role)

It is a nested object. To access its data use:

agent.role.displayName: The role of the character (e.g. "Initiator", "Duelist", "Controller").
agent.role.description: The mechanical definition of what that role should do.
agent.role.displayIcon: URL of the official role icon.

Abilities (agent.abilities)

It is an array of objects with the 4 powers of the character. If you loop through them, each ability has:
ability.slot: The assigned key ("Ability1", "Ability2", "Grenade", "Ultimate").
ability.displayName: Name of the ability (e.g. "Wingman").
ability.description: Detailed explanation of how the power works.
ability.displayIcon: URL of the power icon for the user interface.
