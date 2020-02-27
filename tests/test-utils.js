/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
const config = require('./config');

module.exports = class TestUtils {
  /**
   * @param {string} action
   * @param {int} issueNumber
   */
  getDefaultPayloadMock(action, issueNumber) {
    return {
      action,
      label: {
        name: config.labels.toBeMerged.name,
      },
      repository: {
        owner: {
          login: 'toto'
        }
      },
      issue: {
        id: 12345,
        node_id: 'abcd',
        number: issueNumber,
        title: 'An issue',
        milestone: {title: config.milestones.next_patch_milestone},
        labels: [
          {
            id: 789,
            node_id: 'abcd',
            url: 'https://github.com/prestashop/test-project-bot/labels/todo',
            name: 'todo',
            color: 'eadd85',
            default: false,
          }
        ],
      },
    };
  }

  getDefaultGithubAPIClientMock() {
    return {
      projects: {
        listCards: jest.fn().mockReturnValue(Promise.resolve({
          data:
            [
              {
                content_url: 'https://github.com/prestashop/test-project-bot/issues/8',
                column_url: 'https://api.github.com/projects/columns/3311239',
                id: 'z',
              },
              {
                content_url: 'https://github.com/prestashop/test-project-bot/issues/11',
                column_url: 'https://api.github.com/projects/columns/3311239',
                id: 'a',
              },
            ],
        })),
        createCard: jest.fn().mockReturnValue(Promise.resolve({})),
        deleteCard: jest.fn().mockReturnValue(Promise.resolve({})),
        moveCard: jest.fn().mockReturnValue(Promise.resolve({})),
      },
      issues: {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: {
            user: {
              login: 'toto',
            },
            labels: [

            ]
          }
        })),
        addLabels: jest.fn().mockReturnValue(Promise.resolve({})),
        removeAssignees: jest.fn().mockReturnValue(Promise.resolve({})),
      }
    };
  }
};
