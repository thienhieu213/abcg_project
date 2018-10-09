<?php

namespace Elgg\Plugins;

use Elgg\Router\Route;
use Elgg\UnitTestCase;

class StaticConfigTest extends UnitTestCase {

	use PluginTesting;

	/**
	 * @var \ElggPlugin
	 */
	private $plugin;

	public function up() {
		$this->plugin = $this->startPlugin();
	}

	public function down() {

	}

	public function testEntityRegistration() {

		$entities = $this->plugin->getStaticConfig('entities', []);

		foreach ($entities as $entity) {
			$this->assertNotEmpty($entity['type']);
			$this->assertNotEmpty($entity['subtype']);
			if (isset($entity['class'])) {
				$this->assertTrue(class_exists($entity['class']));
			}
		}
	}

	public function testActionsRegistration() {

		$actions = $this->plugin->getStaticConfig('actions', []);
		$root_path = rtrim($this->getPath(), '/');

		foreach ($actions as $action => $action_spec) {
			$this->assertInternalType('array', $action_spec);

			$filename = elgg_extract('filename', $action_spec, "$root_path/actions/{$action}.php");
			$this->assertFileExists($filename);
		}
	}

	/**
	 * @group Routing
	 */
	public function testRouteRegistrations() {

		$routes = $this->plugin->getStaticConfig('routes', []);
		
		foreach ($routes as $name => $conf) {
			if (elgg_extract('handler', $conf)) {
				$this->assertTrue(is_callable($conf['handler']));
			} else if (elgg_extract('resource', $conf)) {
				$view = "resources/{$conf['resource']}";
				$this->assertTrue(elgg_view_exists($view), "Resource $view for route $name does not exist");
			}

			elgg_register_route($name, $conf);
			$this->assertInstanceOf(Route::class, _elgg_services()->routeCollection->get($name));
			elgg_unregister_route($name);
		}
	}
}