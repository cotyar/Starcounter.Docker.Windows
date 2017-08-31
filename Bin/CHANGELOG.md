## [Unreleased] - Unreleased

### Removed
- Database mapping via `DbMapping` is completely removed. Its going to be replaced with more functional database mapping in the future [#95](https://github.com/Starcounter/RebelsLounge/issues/95)
- Firewall rules alteration is removed from the Starcounter installer. System administrator needs to open certain ports explicitly: https://github.com/Starcounter/level1/issues/4037
- Removed "ListAll" method in "Blender": https://github.com/Starcounter/RebelsLounge/issues/147
- Removed LauncherLayoutInfo support from `<stracounter-include>` [starcounter-include#41](https://github.com/Starcounter/starcounter-include/issues/41)

### Added
- Added a new set of `Db.FromId` overloads, both intended to eventually replace `DbHelper.FromID` and to support versions that accept the identity encoded as a string. See [Level1/#2567](https://github.com/Starcounter/Level1/issues/2567).
- Added support for an additional, simplified and (as it seem) more expected way to specify the name of the database in basic staradmin commands, i.e. `staradmin [new|delete|start|stop] db [name]` and improved staradmin CLI in general, catching more corner cases and reporting better error messages. See [Level1/#3000](https://github.com/Starcounter/Level1/issues/3000)
- DDLs are executed in native query processor if available there, [#4138](https://github.com/Starcounter/level1/issues/4138). They are ALTER TABLE ADD/DROP COLUMN, DROP TABLE, CREATE TABLE, DROP INDEX. Part of Vacuum functionality [Level0#199](https://github.com/Starcounter/level0/issues/199).
- Added a new scheme for wrapping json responses in namespaces to allow multiple partial viewmodels per app. This feature is disabled per default. To enable it, set configuration option `UseAlternativeNamespacesForJson` to `true` [Level1/#4061](https://github.com/Starcounter/level1/issues/4061)
- Added Custom Elements V1 polyfill [`document-register-element`](https://github.com/WebReflection/document-register-element) [RebelsLounge#123](https://github.com/Starcounter/RebelsLounge/issues/123), to be able to run CE V1 on V0 environment.
- Added `Blender.ListByUris` and `Blender.ListByTokens` methods: https://github.com/Starcounter/RebelsLounge/issues/147
- Added a method to get full list of handlers participating in blending for a specific handler `Blender.ListForSpecificUri`: https://github.com/Starcounter/RebelsLounge/issues/147
- Added methods to activate and deactivate a blending rules via `Blender.Activate` and `Blender.Deactivate` (to check activness `Blender.IsActive`): https://github.com/Starcounter/RebelsLounge/issues/147
- Enabled namespacing on root-level for blended responses with json. This will allow blending on all levels [#4017](https://github.com/Starcounter/Level1/issues/4017)
- Added fragmentation support for WebSockets. Related to issue: https://github.com/Starcounter/level1/issues/3837
- Added methods `Blender.ListByToken` and `Blender.ListByUri`. Related issue: https://github.com/Starcounter/RebelsLounge/issues/147
- Added default slot for default composition (`declarative-shadow-dom`) to HTMLmerger [Juicy/juicy-composition#4](https://github.com/Juicy/juicy-composition/issues/4)

### Fixed
- Fixed view-model synchronization when modified from `starcounter-debug-aid`'s JSON-Editor.
- Fixed handling of deleted database objects in the automatic dirtycheck for TypedJSON [Level1/issues/2140](https://github.com/Starcounter/Level1/issues/2140)
- Fixed a nullreferenceexception when adding an item that had no template to an array which expected another template [Level1/issues/4216](https://github.com/Starcounter/Level1/issues/4216)
- Fixed a bug where an incorrect remove patch was sent to the client [Home/issues/97](https://github.com/Starcounter/Home/issues/97)
- Fixed inconsistency in `staradmin start db` when starting database after stopping host, [Home/issues/130](https://github.com/Starcounter/Home/issues/130).
- Fixed internal bug in errorhandling which lead to unclear error back to user [Leve1/#2707](https://github.com/Starcounter/level1/issues/2707)
- Fixed a bug in TypedJSON where adding a property in the code-behind with the same name as a property in the Json-by-example file was not always properly detected [Home/#142](https://github.com/Starcounter/Home/issues/142)
- Fixed a bug in TypedJSON where adding a static using directive in code-behind caused compilation error in generated code [Home/#127](https://github.com/Starcounter/Home/issues/127)
- Fixed escaping query keys in app name for Merged HTML [starcounter-include#36](https://github.com/Starcounter/starcounter-include/pull/36)
- Fixed CompositionProvider integration with `<stracounter-include>` [starcounter-include#41](https://github.com/Starcounter/starcounter-include/issues/41)
- `<stracounter-include>` ignores Palindorm meta data when building merged HTML URL [starcounter-include#37](https://github.com/Starcounter/starcounter-include/issues/37)
- Fixed issue with case insensitive headers in HTTP Request and Response: https://github.com/Starcounter/Home/issues/178

### Improved

- Improved message for error `ScErrFieldSignatureDeviation (SCERR4128)` to include if types are nullable or not [Home/issues/104](https://github.com/Starcounter/Home/issues/104)
- Improved reported error for non-public code properties in database classes [Level1/#4217](https://github.com/Starcounter/level1/issues/4217)
- Improved the overall behaviour of sessions and session-storage [#139](https://github.com/Starcounter/Home/issues/139)
- Improved the flow of converting TypedJSON to some resource based on mimetype including using the interface `IResource` and calling middleware for providing custom conversions [#78](https://github.com/Starcounter/Home/issues/78)

### Changed

- Upgraded `palindrom-client` to 4.0.0.
    - Upgraded Palindrom to 3.0.0.
    - fast-json-patch to 2.0.0.
- Upgraded Polymer to 1.9.3.
- Upgraded to jsonpatch 1.2.2.
- Removed PuppetJs `ignoreAdd`.
- New handler registration automatically overrides previous handler registration.
- `RunWithinApplication` is obsolete, because it breaks the isolation and independency between applications. `HandlerOptions.ReplaceExistingHandler` is removed.
- Handler levels are removed because of no use.
- Partials `UriMapping` is now replaced with `Blender` functionality underneath (`UriMapping` API is still in place) [#95](https://github.com/Starcounter/RebelsLounge/issues/95)
- Default `PartialToStandaloneHtmlProvider` now uses `<starcounter-include>` instead of `imported-template` - makes blending and `declarative-shadow-dom` available on root level, may affect some CSS rules [Starcounter/Home#89](https://github.com/Starcounter/Home/issues/89)
- SQL statement DELETE FROM can be executed through `Db.SQL` in addition to `Db.SlowSQL` [#169](https://github.com/Starcounter/level1/issues/169)
- Recursive (or chained) behavior of Blender calls is now removed: if the blended handler is called, its not triggering blended handlers further. [#128](https://github.com/StarcounterApps/Website/issues/128)
- Upgraded `<starcounter-include>` from 2.3.2. to 2.4.1 (https://github.com/Starcounter/starcounter-include/releases)
- Administrator no longer loads a JS file from a public CDN [#3208](https://github.com/Starcounter/level1/issues/3208)
- Administrator now uses Palindrom 3.0.0 (dropped support for IE)
- Renamed `Blender.ListForSpecificUri` to `Blender.GetRunCandidatesForUri`. Related issue: https://github.com/Starcounter/RebelsLounge/issues/147
- Renamed `Blender.ListByUris` to `Blender.ListAllByUris`. Related issue: https://github.com/Starcounter/RebelsLounge/issues/147
- Renamed `Blender.ListByTokens` to `Blender.ListAllByTokens`. Related issue: https://github.com/Starcounter/RebelsLounge/issues/147

## [2.3.0.6350] - 2017-04-25

### Added
- Added `translate-shadowdom` v0.0.5 to translate between Shadow DOM v0 and v1.
- Added interface `IExplicitBound<T>` which will generate compile-time errors on bound properties in TypedJSON [#262](https://github.com/Starcounter/Starcounter/issues/262)
- Added possibility to override delegates used for bindings in TypedJSON to allow custom implemented getters and setters [#3977](https://github.com/Starcounter/Starcounter/issues/3977)
- Asynchronous transaction support with Db.TransactAsync
- Added new option to the deserializer for TypedJSON that will allow conversion, if possible, of values that doesn't match expected type. This is enabled by default [#4062](https://github.com/Starcounter/Starcounter/issues/4062)
- Added support to install the Starcounter Visual Studio extension in VS 2017, by means of manually doing so using a provided Starcounter.VS15.vsix package, [#4120](https://github.com/Starcounter/Starcounter/issues/4120)
- Starcounter installer now support installing extension in VS 2017, and using another install approach, see [#4135](Starcounter/Starcounter/pull/4135)
- New compatiblity verification scheme when building projects, assuring projecst target a compatible version, see [#4143](https://github.com/Starcounter/Starcounter/issues/4143)
- Support for new `staradmin start cleaner` command, allowing database cleaning, see [#4177](https://github.com/Starcounter/Level1/issues/4177)
- Added Vacuum table [#200](https://github.com/Starcounter/level0/issues/200) and fixed to return a meaningful error if the metatable is missing in existing database [#223](https://github.com/Starcounter/level0/issues/223)
- Added `Handle.GetRegisteredHandlers` and `Handle.GetHandlerForUri` according to the related issue: https://github.com/Starcounter/Home/issues/99

### Fixed
- Fixed a bug where pushing changes on websocket could cause versioning and patches to be messed up [#3844](https://github.com/Starcounter/Starcounter/issues/3844)
- Fixed a bug in session management where more than one thread/scheduler got access to a session, leading to incorrect versioning for outgoing patches.
- Fixed a bug where setting dataobject on an array lead to a `NullReferenceException` [#3856](https://github.com/Starcounter/Starcounter/issues/3856)
- Fixed a bug where changing and reusing partials didn't properly generate patches for client [#3465](https://github.com/Starcounter/Starcounter/issues/3465)
- Fixed a bug where bound arrays were not properly marked as dirty when setting dataobject to null [#3879](https://github.com/Starcounter/Starcounter/issues/3879)
- Fixed a bug where database may hang deleting a record. As the root cause of the problem is in the wrong data stored in the database image, it's necessary to do unload/reload during upgrade to fix the image. [#3875]
- Fixed infinite waiting loop in the installer when the installation folder was not empty.
- Fixed reloading of floating-point fields.
- Fixed retrieving long fields containing long.MinValue. [#3907](https://github.com/Starcounter/Starcounter/issues/3907)
- Improved errormessage when an exception occurs in a binding between a TypedJSON object and a dataobject [#3760](https://github.com/Starcounter/Starcounter/issues/3760)
- Fixed bug in X6Decimal where an exception was not raised in some cases leading to unhandled dataloss [#3892](https://github.com/Starcounter/Starcounter/issues/3892)
- Fixed iOS 10 support in webcomponents Polyfill [#3871](https://github.com/Starcounter/Starcounter/issues/3871)
- Fixed a NullReferenceException when calling `ProcessInput` for a property in a on a non-stateful TypedJSON instance [#3935](https://github.com/Starcounter/Starcounter/issues/3935)
- Fixed scoping in auto-assigned slots for stamped `HTMLCompositions` [#3859](https://github.com/Starcounter/Starcounter/issues/3859)
- Fixed workaround for webcomponents polyfill bug that result in erasing `starcounter-composition`s in some cases [StarcounterSamples/People#49](https://github.com/StarcounterSamples/People/issues/49)
- Fixed a bug in codegen for TypedJSON where a loop was terminated instead of current item skipped, which lead to using IExplicitBound<> sometimes added compile-time checks for properties that should not be bound [#262](https://github.com/Starcounter/Starcounter/issues/262)
- Fixed a bug in PuppetJs when a new HTTP request from the client aborted the previous request [#3981](https://github.com/Starcounter/Starcounter/issues/3981)
- Fixed observing changes to `select` element in Chrome [PuppetJs/PuppetJs#106](https://github.com/PuppetJs/PuppetJs/issues/106)
- Fixed bug in VS extension, caused by VS Update 3, causing VS to hang when a project without a .suo file was opened from the shell, [#3781](https://github.com/Starcounter/Starcounter/issues/3781)
- Fixed a bug in TypedJSON when using a property named `Item` would fail because of indexers (`json[int]` and `json[string]`) in baseclass `Json` [#4029](https://github.com/Starcounter/Starcounter/issues/4029)
- Fixed a bug where the `OnData()` callback in TypedJSON sometimes triggered after bound properties was accessed instead of before [#4035](https://github.com/Starcounter/Starcounter/issues/4035)
- Fixed a bug where dynamic usage of single value json did not work as expected [#4056](https://github.com/Starcounter/Starcounter/issues/4056)
- Fixed a bug when stateful arrays in arrays were used that for certain conditions threw exception [#4055](https://github.com/Starcounter/Starcounter/issues/4055)
- Fixed a bug in serverside blending where stateful partials was blended more than one time leading to duplicate partials on the client [Starcounter/RebelsLounge#80](https://github.com/Starcounter/RebelsLounge/issues/80)
- Fixed a bug in serverside blending where a flag determining if a path for a patch should be namespaced or not was disabled, but never enabled again [#4098](https://github.com/Starcounter/Starcounter/issues/4098)
- Fixed a bug where setting custom bound delegates on a template for TypedJSON would cause the delegates to be called too many times during dirtychecking [#4104](https://github.com/Starcounter/Starcounter/issues/4104)
- Fixed a bug that leading underscore was not allowed in identifiers in CREATE INDEX statements [#4102](https://github.com/Starcounter/Starcounter/issues/4102)
- Setting references for viewmodel and template instances to null when storing versioninformation needed for transformation of jsonpatches when client and server is out-of-sync. These references are not needed and will, if not resetted, keep the instances from being garbage collected [#4131](https://github.com/Starcounter/Starcounter/issues/4131)
- Distributed new extension 1.0.4, due to mismatch in 1.0.3, see [#4157](https://github.com/Starcounter/Starcounter/issues/4157)
- Fixed poor user experience when database class contain object array, [#4089](https://github.com/Starcounter/Starcounter/issues/4089)
- Fixed bugs when adding and removing blended viewmodels where patches was not correctly generated [#4170](https://github.com/Starcounter/Starcounter/issues/4170)
- Fixed a bug when `Clear()` was called on a TypedJSON array that did not check if changes should be tracked or not [#4171](https://github.com/Starcounter/Starcounter/issues/4171)
- Fixed checking for null-values in Response/Request headers [#4184](https://github.com/Starcounter/Level1/issues/4184)
- Fixed a bug where an instance of `Session` was left on the thread after a task was finished leading to additional exceptions later on [#67](https://github.com/Starcounter/Home/issues/67)
- Fixed a bug where a reference to dataobject was not updated during check for bound arrays in Starcounter.XSON [#4122](https://github.com/Starcounter/Level1/issues/4122)
- Fixed race condition with view-model attached by `<starcounter-include>` [Starcounter/starcounter-include#25](https://github.com/Starcounter/starcounter-include/issues/25)
- Fixed problem with cloning databases with x-copy approach, due to usage of embedded UUID, see [RebelsLounge/issues/96](https://github.com/Starcounter/RebelsLounge/issues/96)
- Better predicability when creating UUID from database name to pass to scdata.exe, see [Starcounter.Core/issues/157](https://github.com/Starcounter/Starcounter.Core/issues/157)
- Fixed a bug where an incorrect mimetype was specified on a response that had TypedJSON as resource [Home/issues/76](https://github.com/Starcounter/Home/issues/76)

### Improved
- Improved the message coming from exceptions when applying jsonpatches [#3987](https://github.com/Starcounter/Starcounter/issues/3987)
- Improved errormessage when an invalid value is detected during deserialization of json and parsing of jsonpatches [#4065](https://github.com/Starcounter/Starcounter/issues/4065)
- Removed the call to push on websocket directly after upgrade since it's not needed [#4110](https://github.com/Starcounter/Starcounter/issues/4110)
- Improved number of accesses to bound properties in TypedJSON when the whole viewmodel is requested [#4111](https://github.com/Starcounter/Starcounter/issues/4111)

### Changed
- Upgraded Polymer to 1.8.1 [#4146](https://github.com/Starcounter/level1/issues/4146).
- Upgraded PuppetJs to 2.5.0 [#4147](https://github.com/Starcounter/Starcounter/issues/4147).
- Upgraded `fast-json-patch` to [1.1.8](https://github.com/Starcounter-Jack/JSON-Patch/releases).
- Upgraded `json-patch-queue` to [2.0.1](https://github.com/Palindrom/json-patch-queue/releases).
- Upgraded `juicy-composition` to [0.1.0](https://github.com/Juicy/juicy-composition/releases).
- `starcounter-include` (`juicy-composition`) uses Shadow DOM V1 API if available, translates compositions from V0 to V1 and from V1 to V0 if needed [Starcounter/RebelsLounge#81](https://github.com/Starcounter/RebelsLounge/issues/81).
- Upgraded `puppet-redirect` to [0.4.3](https://github.com/Palindrom/palindrom-redirect/releases}.
- Changed the parser for Json-by-example from F# parser to NewtonSoft (nuget) [#3811](https://github.com/Starcounter/Starcounter/issues/3811)
- Removed code for creating codegenerated jsonserializers for TypedJSON [#3832](https://github.com/Starcounter/Starcounter/issues/3832)
- Redesigned weaver and app compiler as host-agnostic libraries [#3684](https://github.com/Starcounter/Starcounter/issues/3684)
- Upgraded webcomponents.js to 0.7.24 [#3925](https://github.com/Starcounter/Starcounter/issues/3925), [#4088](https://github.com/Starcounter/Starcounter/issues/4088)
- Upgraded Starcounter/starcounter-include from 2.0.0 to 2.3.2 (https://github.com/Starcounter/starcounter-include/releases)
- Deprecated/renamed `<template is="starcounter-composition">` in favor of `<template is="declarative-shadow-dom">` [Starcounter/TechComm#286](https://github.com/Starcounter/TechComm/issues/286), [Starcounter/RebelsLounge#79](https://github.com/Starcounter/RebelsLounge/issues/79)
- Upgraded Juicy/imported-template from 1.4.3 to 1.5.0 (https://github.com/Juicy/imported-template/releases)
- Upgraded Juicy/juicy-html to 1.2.0 (https://github.com/Juicy/juicy-html/releases)
- Upgraded puppetjs/puppet-polymer-client from 3.2.0 to 3.2.2 (https://github.com/PuppetJs/puppet-polymer-client/releases)
- Upgraded starcounter-debug-aid from 2.0.7 to 2.0.12 (https://github.com/Starcounter/starcounter-debug-aid/releases)
- Upgraded jsoneditor from 5.5.6 to 5.5.11 (https://github.com/josdejong/jsoneditor/releases)
- Upgraded Bootswatch Paper from 3.3.6+2 to 3.3.7
- Removed automatic adding of `Set-Cookie: Location=x` and `Set-Cookie: ScSessionCookie=x` headers for outgoing responses with new session, and instead added `X-Location` header with the location of the session. This header can be changed or disabled by setting `session.UseSessionHeader` and `session.SessionHeaderName` [#3798](https://github.com/Starcounter/Starcounter/issues/3798)
- Including location of session in the response for the standalone html from the `PartialToStandaloneHtmlProvider` middleware to solve problems with mixed up sessions when several tabs are used [#3798](https://github.com/Starcounter/Starcounter/issues/3798)
- Rewrote serializer for TypedJSON and changed public API. `TypedJsonSerializer` class and methods are marked obsolete. Interface `ITypedJsonSerializer` should be used instead. This doesn't affect existing apps though since most of this is only used internally [#3887](https://github.com/Starcounter/Starcounter/issues/3887)
- Rewrote how json was parsed and generated in TypedJSON jsonpatch implementation and obsoleted public methods that took `IntPtr` as input-parameter. This doesn't affect existing apps though since most of this is only used internally [#3887](https://github.com/Starcounter/Starcounter/issues/3887)
- Made several methods in class `JsonExtension` obsolete as a step to avoid duplication of code and to improve overall code structure in Starcounter.XSON
- Removed virtual methods from class `Json` that shouldn't be used, and that never worked correctly (`ChildArrayHasAddedAnElement`, `ChildArrayHasRemovedAnElement`, `ChildArrayHasReplacedAnElement`)
- Refactored parts of the dirtycheck in Starcounter.XSON to allow overriding methods `CollectChanges(ChangeLog)` and `Checkpoint()` to allow custom code to be run when collecting changes and when all changes are collected when generating jsonpatches. First step for issue to enhance callback system for TypedJSON [#3727](https://github.com/Starcounter/Starcounter/issues/3727)
- Db.Transact() family is redesigned to be a thin wrapper around Db.TransactAsync(), that effectively just calls Db.TransactAsync() and synchronously waits for returned Task. Thus Db.Transact() becomes a blocking call that waits for IO on write transactions. Take a look at the corresponding section at [Synchronous vs Asynchronous transactions](\guides\transactions\more-on-transactions.md#sync_vs_async) for reasoning and possible performance implications.
- Overloads of `Db.Transact`, `Db.Scope`, `Transaction.Scope`, `ITransaction.Scope` and `JsonExtension.Scope`   that accepts additional arguments for user delegate are marked obsolete. Consider using capturing of local variables instead.
- Changed behaviour of (long-running) transactions to make sure they are only active (i.e. scoped) from one scheduled thread at a time. Calling `transaction.Scope` from another scheduled thread while a scope is already active for the same transaction will result in an exception [#4021](https://github.com/Starcounter/Starcounter/issues/4021)
- Made the function that compares two dataobjects in TypedJSON to a delegate which can be overriden to supply custom comparison [#4122](https://github.com/Starcounter/Starcounter/issues/4122)
- Disabled gzipping for static file resources in the Web server [#4013](https://github.com/Starcounter/Starcounter/issues/4013)
- By default `PartialToStandaloneHtmlProvider` Polymer uses native Shadow DOM if available [#4133](Starcounter/Starcounter/pull/4133)
- `<starcounter-include>` now attaches view-model *after* the partial view is imported, once stamped [Starcounter/starcounter-include#25](https://github.com/Starcounter/starcounter-include/issues/25)

## [2.2.1.3234] - 2016-09-19 Built / 2016-09-28 Public

### Added
- Better error message when a synonym target an illegal element, [#3677](https://github.com/Starcounter/Starcounter/issues/3677)
- Made `staradmin list apps` support filtering on a specific database by giving `-d|--database`, [#3521](https://github.com/Starcounter/Starcounter/issues/3521)
- Support for reconnecting with [PuppetJs](https://github.com/puppetjs/puppetjs). [puppetjs/puppetjs#71](https://github.com/puppetjs/puppetjs/issues/71)
- Added versionnumber to generated files for TypedJSON to force regeneration when codegenerator is changed [#3732](https://github.com/Starcounter/Starcounter/issues/3732)
- Improved binding in TypedJSON from property in Json-by-example to property in code-behind with allowing using the same name (and type) to automatically bind [#2964](https://github.com/Starcounter/Starcounter/issues/2964)
- Added a new itemtemplate for Starcounter projects, `HTML template with dom-bind` [#2931](https://github.com/Starcounter/Starcounter/issues/2931)
- Added support for enums when a template for TypedJSON is created based on the type for a dataobject [#3759](https://github.com/Starcounter/Starcounter/issues/3759)
- Added possibility to configure how missing members (i.e. members that exists in the source, but not in the template) should be handled in TypedJSON when populating an instance. Options are to either throw an error or ignore and skip the member [#3802](https://github.com/Starcounter/Starcounter/issues/3802)
- ShadowDOM layout capabilities to [`<starcounter-include>`](https://github.com/Starcounter/starcounter-include) shipped in `/sys/` folder. Layout can now be served as `DocumentFragment` full of rich HTML & CSS features to be served with [`juicy-composition`](https://github.com/Juicy/juicy-composition). It's now the resposibility of Starcounter and particular app, not the Launcher. Launcher may only provide additional visual editing features to it.
- Added HTTP header with disk location for static files: [#3836](https://github.com/Starcounter/Starcounter/issues/3836)

### Fixed
- Fixed problems with dirtycheck in TypedJson after previous fix for databindings in [#3509](https://github.com/Starcounter/Starcounter/issues/3509)
- Checking value after input is received and handled from client before skipping sending patch back to make sure that value is actually set [#3518](https://github.com/Starcounter/Starcounter/issues/3518)
- Setting transaction to none when a TypedJson object is removed from a stateful viewmodel to avoid usage of disposed transactions. [#3525](https://github.com/Starcounter/Starcounter/issues/3525)
- Changed handling of obtaining exclusive access to a session to try a few times and log a warning instead of failing directly.
- Fixed a bug where parts of the viewmodel was not properly checkpointed after generating changes. [#3533](https://github.com/Starcounter/Starcounter/issues/3533)
- Fixed a nullreference when databinding was (incorrectly) used for an untyped array, [#3526](https://github.com/Starcounter/Starcounter/issues/3526)
- Fixed a bug that caused the wrong appname being used in some cases when a TypedJson inputhandler was called [#3548](https://github.com/Starcounter/Starcounter/issues/3548)
- Removing existing items in an array when a new dataobject is set in TypedJSON [#3458](https://github.com/Starcounter/Starcounter/issues/3458)
- Viewmodel versioning (if enabled) is no longer reset when the public viewmodel on a session is changed [#3418](https://github.com/Starcounter/Starcounter/issues/3418)
- Removed temporary solution for htmlmerger from Json serializer and marked `IResource.GetHtmlPartialUrl` as obsolete [#3541](https://github.com/Starcounter/Starcounter/issues/3541)
- Decoding partial urls:s before calling `Self.GET` to allow url:s with parameters [#3527](https://github.com/Starcounter/Starcounter/issues/3527)
- Fixed a bug in the F# parser that parses JSON-by-example for TypedJSON to allow arrays in arrays [#3554](https://github.com/Starcounter/Starcounter/issues/3554)
- Added a check for responses so they doesn't exceed a fixed maximum size to avoid buffer overruns and corrupting managed memory [#3608](https://github.com/Starcounter/Starcounter/issues/3608)
- Fixed problem with WebSocket disconnect procedure [#38](https://github.com/StarcounterSamples/KitchenSink/issues/38)
- Fixed bug in jsonmerger, that in some specific cases returned a response belonging to another app [#3622](https://github.com/Starcounter/Starcounter/issues/3622)  
- Fixed buffer overrun when serializing really large double values in TypedJSON [#3585](https://github.com/Starcounter/Starcounter/issues/3585), [#3589](https://github.com/Starcounter/Starcounter/issues/3589)
- Fixed so that Typed JSON code-behind classes can derive generic classes [#3640](https://github.com/Starcounter/Starcounter/issues/3640)
- Enabled Typed JSON code-behind classes with naked IBound-declaration, resolving [#3624](https://github.com/Starcounter/Starcounter/issues/3624)
- Fixed a bug where patches in a databound array were not properly generated, after an item was removed [#3669](https://github.com/Starcounter/Starcounter/issues/3669)
- Fixed a bug relating to reference failures sometimes showing with new Roslyn-based code-behind parser, [#3666](https://github.com/Starcounter/Starcounter/issues/3666)
- Fixed a bug where a part of the jsontree was prematurely checkpointed when gathering changes for creating patches.
- Allowing empty string as value in patches for properties with type long, decimal or double when applying jsonpatches. This value will be converted to the default value for the specified type and also correct value will be sent back to client [#3725](https://github.com/Starcounter/Starcounter/issues/3725)
- When accepting patch to be enqueued, return normal patch response (previously returning empty response)
- Fixed URI aliasing problem in gateway: [#3731](https://github.com/Starcounter/Starcounter/issues/3731)
- Fixed a bug in Response-serialization (`Response.ConstructFromFields()`), which could cause estimated size to be smaller then actual needed size in some cases [#3735](https://github.com/Starcounter/Starcounter/issues/3735)
- Fixed a bug where using an empty jsonobject as response for a mapped uri, did not get properly serialized to client or changes collected correctly when sending patches [#3755](https://github.com/Starcounter/Starcounter/issues/3755)
- Fixed detecting if a jsonobject is already merged or not when attaching it to a parent [#3771](https://github.com/Starcounter/Starcounter/issues/3771)
- Fixed a bug in TypedJSON where versionlog of changes in arrays were not properly updated, which in some cases led to a `NullReferenceException` being thrown [#3816](https://github.com/Starcounter/Starcounter/issues/3816)  
- Fixed the network gateway startup issues: [#3480](https://github.com/Starcounter/Starcounter/issues/3480)
- Fixed a case when HTTP handler does not respond if mapped in UriMapping.Map but called from the outside: [#3840](https://github.com/Starcounter/Starcounter/issues/3840)
- Fixed too small time given to release IPC chunks to shared chunk pool: [#3823](https://github.com/Starcounter/Starcounter/issues/3823)

### Changed
- Obsoleted `Session.ToAsciiString()` and added `Session.SessionId` [#3586](https://github.com/Starcounter/Starcounter/issues/3586)
- Rewrote the Typed JSON code-behind parser, now driven by Roslyn [#3439](https://github.com/Starcounter/Starcounter/issues/3439)
- Cache value of bound properties in TypedJSON when gathering changes and generating patches to avoid excessive access to bound data [#2551](https://github.com/Starcounter/Starcounter/issues/2551)
- CLI command `staradmin delete db` will no longer fail when, but instead stop, database is running [#3649](https://github.com/Starcounter/Starcounter/issues/3649)
- `PartialToStandaloneHtmlProvider` middleware no longer forces Shadow DOM in Polymer [#3562](https://github.com/Starcounter/Starcounter/issues/3562)
- `PartialToStandaloneHtmlProvider` middleware no longer overwrites default Bootstrap font size [#3665](https://github.com/Starcounter/Starcounter/issues/3665)
- Upgraded Polymer to 1.6.1 [#3673](https://github.com/Starcounter/Starcounter/issues/3673), [#3797](https://github.com/Starcounter/Starcounter/issues/3797)
- Removed parameter `forceSnapshot` from `Db.Transact()` methods since the parameter is no longer valid. A `Db.Transact()` is always executed in snapshot isolation.
- Removed parameter `detectConflicts` from `Transaction` since the parameter is no longer valid. A `Transaction` can no longer detect conflicts.
- Upgraded fast-json-patch to 1.1.0 [PuppetJs#98](https://github.com/PuppetJs/PuppetJs/issues/98). JSON Patch => Puppet observes also `keydown` and `mousedown` events and generate patches in more accurate order.
- Upgraded PuppetJs to 2.2.1 [PuppetJs#85](https://github.com/PuppetJs/PuppetJs/issues/85). This makes changes made in reaction to server patches (in `onRemoteChange` callback or in Polymer observer callback) properly propagated to server.
- For request to invalid (non-existent) session, return 404 instead of 400
- Upgraded starcounter-debug-aid from 2.0.5 to 2.0.7 (https://github.com/starcounter/starcounter-debug-aid/releases)
- Upgraded Juicy/juicy-jsoneditor from 1.0.5 to 1.1.0 (https://github.com/juicy/juicy-jsoneditor/releases)
- Upgraded Josdejong/jsoneditor from 4.2.1 to 5.5.6 (https://github.com/josdejong/jsoneditor/releases)
- Upgraded Juicy/imported-template from 1.4.0 to 1.4.3 (https://github.com/juicy/imported-template/releases)
- Upgraded puppetjs/puppetjs from 1.3.8 to 2.2.1 (https://github.com/PuppetJs/PuppetJs/releases)
- Upgraded puppetjs/puppet-polymer-client from 2.0.0 to 3.2.0 (https://github.com/PuppetJs/puppet-polymer-client/releases)
- Changed how Starcounter VS Extension handles JSON files to allow adding existing files without code-behind so that they are not treated as TypedJSON per default [#3075](https://github.com/Starcounter/Starcounter/issues/3075)
- Changed invocation order of middleware, to execute in order of registration rather than the other way around. [#3810](https://github.com/Starcounter/Starcounter/issues/3810)
- Changed behaviour of default patchhandler to treat empty incoming patches as ping/heartbeats and send no patches back to client (i.e. not collecting the latest changes) [PuppetJs/#94](https://github.com/PuppetJs/PuppetJs/issues/94)

## [2.2.1834] - 2016-04-19
### Added
- New staradmin command `staradmin start server`, as requested in [#2950](https://github.com/Starcounter/Starcounter/issues/2950) and documented at [staradmin CLI](http://starcounter.io/guides/tools/staradmin/).
- New staradmin command `staradmin start database`, as requested in [#2950](https://github.com/Starcounter/Starcounter/issues/2950) and documented at [staradmin CLI](http://starcounter.io/guides/tools/staradmin/). By default, this command also automatically create the specified database if it does not exist.
- Support for new command `staradmin new db` allowing simple creation of databases from the command-line, as requested in [#2973](https://github.com/Starcounter/Starcounter/issues/2973) and documented at [staradmin CLI](http://starcounter.io/guides/tools/staradmin/).
- Added support for new command option --failmissing to `staradmin delete`, forcing the operation to fail if the specified artifact does not exist, as described in [#2995](https://github.com/Starcounter/Starcounter/issues/2995). Documented at [staradmin CLI](http://starcounter.io/guides/tools/staradmin/).
- Support for transient classes, [#3010](https://github.com/Starcounter/Starcounter/issues/3010).
- New feature: assembly level [Database] declaration, [#3005](https://github.com/Starcounter/Starcounter/issues/3005).
- Simplifications when passing source code to `star.exe`, [#3004](https://github.com/Starcounter/Starcounter/issues/3004) and [#3011](https://github.com/Starcounter/Starcounter/issues/3011).
- Introduced support for transacted entrypoints with `star --transact`, [#3008](https://github.com/Starcounter/Starcounter/issues/3008).
- Introduced simple built-in dependency injection into Starcounter and in the code host in particular, enabled by IServices and IServiceContainer, outlined by [#3017](https://github.com/Starcounter/Starcounter/issues/3017)
- Added support for first *extension point* in Starcounter, based on new `IQueryRowsResponse` interface as issued in [#3016](https://github.com/Starcounter/Starcounter/issues/3016)
- Introduced a small suite of classes allowing simple **iteration of property values** using class `ViewReader`, described in [#3033](https://github.com/Starcounter/Starcounter/issues/3033).
- Upgraded client side libraries (list of current versions available in src/BuildSystem/ClientFiles/bower-list.txt)
- Ability to specify multiple resource directories on the command-line, fixes [#2898](https://github.com/Starcounter/Starcounter/issues/2898). For reference, see [#3099](https://github.com/Starcounter/Starcounter/issues/3099).
- `Partial` class with the support for implicit standalone mode [#3176](https://github.com/Starcounter/Starcounter/issues/3176)
- Added possibility to use straight handlers paramters notation "{?}" in URIs when doing mapping. Paramter type notation "@w" is still supported but is temporary and will be removed in future.
- Added functionality to unregister existing HTTP handlers. Documentation information added to http://starcounter.io/guides/network/handling-requests/#unregistering-existing-http-handlers
- Added a possibility to stream data over TCP, WebSockets and HTTP responses: [#9](https://github.com/Starcounter/Starcounter/issues/9)
- Added `Session.ToAsciiString()` to convert an existing session into an ASCII string. Later this session ASCII string can be used as parameter to `Session.ScheduleTask`.
- Added simpler task scheduling interface using static method `Scheduling.ScheduleTask()`.
- Added excecptions with information about failed table to upgrade. Related to [#3383](https://github.com/Starcounter/Starcounter/issues/3383) and [#3368](https://github.com/Starcounter/Starcounter/issues/3368).
- Extended the basic admin REST API to support creating databases with custom settings [#3362](https://github.com/Starcounter/Starcounter/issues/3362)
- Made `staradmin new db` support the name to be given as a first parameter, like `staradmin new db`
- Extended `staradmin new db` to support custom settings as specified in [#3360](https://github.com/Starcounter/Starcounter/issues/3360)
- Introduced new IMiddleware class and the new consolidated middleware Application.Use() API's, as described in See [#3296](https://github.com/Starcounter/Starcounter/issues/3296)
- Extended weaver diagnostics emitted by `scweaver --verbosity=diagnostic` according to [#3420](https://github.com/Starcounter/Starcounter/issues/3420)
- Introduced support to provision HTML (views) from JSON (view models) by means of middleware. See [#3444](https://github.com/Starcounter/Starcounter/issues/3444)
- Added possibility to register internal codehost handlers with `HandlerOptions.SelfOnly`. See [#3339](https://github.com/Starcounter/Starcounter/issues/3339)
- Added overloads for `Db.Transact` that allows specifying delegates that take input and output parameters. See [#2822](https://github.com/Starcounter/Starcounter/issues/2822) and documentation on http://starcounter.io/guides/transactions/
- Added property `Request.HandlerAppName` to know to which application this request belongs.
- Changed signature of MIME providers, and gave them access to the Request. See [#3451](https://github.com/Starcounter/Starcounter/issues/3451)
- Introduced support for multiple MIME providers / MIME type. See [#3451](https://github.com/Starcounter/Starcounter/issues/3451)
- Redesigned MIME providers so that the are now chained, and responsible for invoking the "next" one. See [#3451](https://github.com/Starcounter/Starcounter/issues/3451)
- Split up built-in provider HtmlFromJsonProvider into that, plus new PartialToStandaloneHtmlProvider. See [#3451](https://github.com/Starcounter/Starcounter/issues/3451)
- Introduced new JsonAutoSessions MIME provider, supporting auto-creation of sessions as middleware. See [#3446](https://github.com/Starcounter/Starcounter/issues/3446)

### Fixed
- Bug fixed for inheritance of objects and arrays in TypedJSON that caused null references: [#2955](https://github.com/Starcounter/Starcounter/issues/2955)
- Fixed issue with setting outgoing fields and using outgoing filters in relation to static file resources responses: [#2961](https://github.com/Starcounter/Starcounter/issues/2961).
- Fixed issue with missing AppName and PartialId in serialized json when running Launcher: [#2902](https://github.com/Starcounter/Starcounter/issues/2902)
- Fixed an issue when Administrator was starting faster than gateway process in scservice: [#2962](https://github.com/Starcounter/Starcounter/issues/2962)
- Fixed text input and text selection issues in Administrator [#2942](https://github.com/Starcounter/Starcounter/issues/2942), [#2400](https://github.com/Starcounter/Starcounter/issues/2400), [#1993](https://github.com/Starcounter/Starcounter/issues/1993)
- Fixed max column width issue in Administrator [#2828](https://github.com/Starcounter/Starcounter/issues/2828)
- Fixed incorrect invalidation of databinding for bound properties in TypedJSON: [#2998](https://github.com/Starcounter/Starcounter/issues/2998)
- Fixed bug caused by using synonyms in new builds: [#2997](https://github.com/Starcounter/Starcounter/issues/2997)
- Removed (not implemented) option `staradmin delete log` as decided in [#2974](https://github.com/Starcounter/Starcounter/issues/2974).
- Fixed [#2976](https://github.com/Starcounter/Starcounter/issues/2976), resource directories and the working directory are no longer mixed.
- Fixed issue with patches for items in arrays for TypedJson sometimes having incorrect index.
- Fixed matching metadata-properties with regular properties in JSON-by-example [#3136](https://github.com/Starcounter/Starcounter/issues/3136).  
- Fixed reseting URL to `""` in view-model after `<juicy-redirect>`/`<puppet-redirect>` redirect [PuppetJs/puppet-redirect#1](https://github.com/PuppetJs/puppet-redirect/issues/1), [PuppetJs/puppet-redirect#2](https://github.com/PuppetJs/puppet-redirect/issues/2)
- Serializing TypedJson from usercode no longer generates json with namespaces. Namespaces are only added when serializing the public viewmodel when the option is set in the session, and also when patches are generated with the same option set. [#3148](https://github.com/Starcounter/Starcounter/issues/3148)
- Improved diagnostic content when weaver is unable to resolve an application dependency, as outlined in [#3227](https://github.com/Starcounter/Starcounter/issues/3227). Now include the probably referring assembly.
- Fixed mouse and keyboard scrolling issues in Administrator error log and SQL browser [#2990](https://github.com/Starcounter/Starcounter/issues/2990), [#2987](https://github.com/Starcounter/Starcounter/issues/2987), [#2986](https://github.com/Starcounter/Starcounter/issues/2986), [#1635](https://github.com/Starcounter/Starcounter/issues/1635)
- Fixed nullreference exception in some cases when a bound array in TypedJSON was changed [#3245](https://github.com/Starcounter/Starcounter/issues/3245)
- Fixed correct handling of bound values for arrays in TypedJSON when bound value was null [#3304](https://github.com/Starcounter/Starcounter/issues/3304)
- Wrapping all generated classes for TypedJSON inside namespace to avoid clashing of names [#3316](https://github.com/Starcounter/Starcounter/issues/3316)
- Added verification when generating code from JSON-by-example for TypedJSON to make sure all properties only contains valid characters [#3103](https://github.com/Starcounter/Starcounter/issues/3103)
- Wrapped unhandled exception from a scheduled task inside a starcounter exception to preserve stacktrace [#3032](https://github.com/Starcounter/Starcounter/issues/3032), [#3122](https://github.com/Starcounter/Starcounter/issues/3122), [#3329](https://github.com/Starcounter/Starcounter/issues/3032)
- Assured weaver.ignore expressions with leading/trailing whitespaces are trimmed, as defined in [#3414](https://github.com/Starcounter/Starcounter/issues/3414)
- Removed buggy dependency to custom VS output pane "Starcounter" as described in [#3423](https://github.com/Starcounter/Starcounter/issues/3423)
- Shaped up obsolete status terminology used in VS as reported in [#532](https://github.com/Starcounter/Starcounter/issues/532)
- Fixed the problem with ScErrInputQueueFull exception when scheduling tasks [#3388](https://github.com/Starcounter/Starcounter/issues/3388)
- Fixed sending only changed/added siblings instead of all siblings when sending patches to client. [#3465](https://github.com/Starcounter/Starcounter/issues/3465)   
- Fixed a potential problem with long-running transactions and scheduling a task for a session that used the same scheduler. [#3472](https://github.com/Starcounter/Starcounter/issues/3472)
- Fixed a nullreference exception when merging json. [#3485](https://github.com/Starcounter/Starcounter/issues/3485)
- Redesigned code host app bootstrapper to work better when apps start in concert, see [#3460](https://github.com/Starcounter/Starcounter/issues/3460)
- Fixed a bug and improved errormessage when generating binding between dataobject and TypedJson where the property in TypedJson was an object or array. [#3491](https://github.com/Starcounter/Starcounter/issues/3491)
- Fixed a bug that it was not possible to use same class names as meta-tables, see [#3482](https://github.com/Starcounter/Starcounter/issues/3482).
- Make sure the request is passed as a parameter when constructing a response from a resource, see [#3496](https://github.com/Starcounter/Starcounter/issues/3496)
- Fixed bug in PrivateAssemblyStore, causing some path comparisons to use an unsupported comparison type, see [#3501](https://github.com/Starcounter/Starcounter/issues/3501)
- Fixed a bug in TypedJson where databinding for a property was not properly invalidated when a dataobject with a different type (including null) was set, [#3509](https://github.com/Starcounter/Starcounter/issues/3509)
- Fixed gateway getting timeout waiting for workers to suspend [#3515](https://github.com/Starcounter/Starcounter/issues/3515)
- Fixed incorrect case-insensitive comparison when deciding if generating an accessor-property should be skipped [#3794](https://github.com/Starcounter/Starcounter/issues/3794)

### Changed
- Changed so that working directory is no longer a resource directory by default.
- Changed so that implicit resource directories are discovered based on the working directory.
- Renamed the MiddlewareFiltersEnabled database flag to RequestFiltersEnabled.
- Its no longer possible to register handlers with same signature. For example, one can't register handler "GET /{?}" with string parameter, and handler "GET /{?}" with integer parameter.
- Due to [`<juicy-redirect>`](https://github.com/Juicy/juicy-redirect) and [`<puppet-redirect>`](https://github.com/PuppetJs/puppet-redirect) update, Custom Element should now be imported from `/sys/juicy-redirect/juicy-redirect.html` or `/sys/puppet-redirect/puppet-redirect.html`. When used with Polymer's template binding, `url` value can be bound two-way via property: `<juicy-redirect url="{{model.path.to.RedirectURL$}}">`
- Added method(s) on Session taking a delegate to be run instead of using `session.StartUsing()` and `session.StopUsing()`,  these two methods are no longer public. [#3117](https://github.com/Starcounter/Starcounter/issues/3117)
- Session API has been refactored. New `Session.ScheduleTask` is added. `Session.ForAll` has been refactored.
- `Session.Destroyed` is now replaced by `Session.AddDestroyDelegate` because of apps separation issues.
- `Session.CargoId` is removed because of no use.
- Made Handle.AddRequestFilter and Handle.AddResponseFilter obsolete in favor new Application.Use() API. See [#3296](https://github.com/Starcounter/Starcounter/issues/3296)
- Syntax for getting headers in request and response changed from `r["Headername"]` to `r.Headers["Headername"]`.
- Changed API for getting all headers string to `r.GetAllHeaders()` for both request and response.
- In `Http` and `Node` receive timeout parameter has changed from milliseconds to seconds (no reasons to have it with milliseconds precision).
- In `Http` and `Node` functions the `userObject` parameter is gone. Because of that the `userDelegate` parameter which was previously `Action<Response, Object>` became just `Action<Response>`.
- Static files from /sys/ folder migrated to Polymer 1.3. See [#3384](https://github.com/Starcounter/Starcounter/issues/3384), [#3022](https://github.com/Starcounter/Starcounter/issues/3022)
- Deprecate usage of `<dom-bind-notifier>` in HTML partial templates. Since Polymer 1.3 upgrade, it is not needed. See [#2922](https://github.com/Starcounter/Starcounter/issues/2922)
- Deprecate usage of `Object.observe` and `Array.observe` shims. Since Polymer 1.3 upgrade, they are not needed. [#3468](https://github.com/Starcounter/Starcounter/issues/3468)
- Deprecate usage of `juicy-redirect`. Puppet web apps should use `puppet-redirect` instead. [#3469](https://github.com/Starcounter/Starcounter/issues/3469)

## [2.1.177] - 2015-10-14
### Changed
- Removal of notion of Polyjuice and major refactoring around this. Full list of changes is here:
[Starcounter.io blog](http://starcounter.io/nightly-changes/list-breaking-changes-starting-build-2-0-3500-3/)
- Applications are now isolated on SQL level, read more here:
[SQL isolation](http://starcounter.io/guides/sql/sql-isolation/)
- Static files from /sys/ folder migrated to Polymer 1.1: [Roadmap to Polymer 1.1](https://github.com/Starcounter/Starcounter/issues/2854)
- UriMapping.OntologyMap now allows only use of fully namespaced class names. Recommended string prefix has changed from "/db/" and "/so/" to UriMapping.OntologyMappingUriPrefix (which is "/sc/db"), for example: UriMapping.OntologyMappingUriPrefix + "/simplified.ring6.chatattachment/@w". As a second parameter you can now simply supply just a fully namespaced class name, like this: "simplified.ring6.chatattachment".
- REST Call ```GET /api/admin/database/[Name]/applications``` Changed to ```GET /api/admin/databases/[Name]/applications``` and
 ```GET /api/admin/database/[Name]/appstore/stores``` Changed to ```GET /api/admin/databases/[Name]/appstore/stores```. Notice the plural in ```databases```
- Renamed the scnetworkgateway.xml in StarcounterBin to scnetworkgateway.sample.xml
- Moved requirement to have at least 2 CPU cores to recommendations, as 4Gb RAM now.
- `Response.HeadersDictionary` is gone and replaced with function `Response.SetHeadersDictionary`. To set individual headers use `response["HeaderName"] = "HeaderValue"` syntax.
- `HandlerOptions.ProxyDelegateTrigger` is now an internal flag that is no longer exposed to user applications (affected Launcher app).
- Starcounter is always installed in a subfolder called "Starcounter".
- Version number in the installation path was removed.

### Fixed
- Unhandled exceptions in UDP/TCP handlers:
https://github.com/Starcounter/Starcounter/issues/2886
- Setting AppName in DbSession.* calls, as well as processing unhandled exceptions there.
- Code rewritten for detecting changes on bound arrays in TypedJSON to avoid producing unnecessary changes: [#2920](https://github.com/Starcounter/Starcounter/issues/2920).
- Bug fixed concerning indexes on database objects. Combined indexes might need to be recreated to work properly: [#2933](https://github.com/Starcounter/Starcounter/issues/2933).
- Bug fixed regarding headers dictionary creation (CreateHeadersDictionaryFromHeadersString):
[#2939](https://github.com/Starcounter/Starcounter/issues/2939).
- Fixed extraction of CRT libraries in installer GUI that caused the issue [#2759](https://github.com/Starcounter/Starcounter/issues/2759)
- Bug fixed when handling error from indexcreation, that caused an assertion failure instead of returning the error to usercode: [#2951](https://github.com/Starcounter/Starcounter/issues/2951)
