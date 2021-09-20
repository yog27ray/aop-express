import { expect } from 'chai';
import fetch from 'node-fetch';
import { dropDB } from './setup';
import { TestTable } from './table/test-table';

describe('Server', () => {
  context('Route', () => {
    it('should call get route', async () => {
      const response = await fetch('http://localhost:1234/api/v1/one/get');
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({ message: 'success' });
    });

    it('should call put route', async () => {
      const response = await fetch('http://localhost:1234/api/v1/one/put', { method: 'PUT' });
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({ message: 'success' });
    });

    it('should call delete route', async () => {
      const response = await fetch('http://localhost:1234/api/v1/one/delete', { method: 'DELETE' });
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({ message: 'success' });
    });

    it('should call post route', async () => {
      const response = await fetch('http://localhost:1234/api/v1/one/post', { method: 'POST' });
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({ message: 'success' });
    });
  });

  context('Middleware', () => {
    it('should call middleware functions', async () => {
      const response = await fetch('http://localhost:1234/api/v1/two', { method: 'PUT' });
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({
        methodCallResponse: 'SubModuleTwoServiceMethodCall:MainServiceMethodCall',
        context: { secondMiddleware: 'true', firstMiddleware: 'true' },
      });
    });

    it('should give promise error', async () => {
      const response = await fetch('http://localhost:1234/api/v1/errorPromiseMiddleWare');
      expect(response.status).to.equal(400);
      const responseJSON = await response.text();
      expect(JSON.parse(responseJSON)).to.deep.equal({ message: 'this is promise error' });
    });

    it('should give throw error', async () => {
      const response = await fetch('http://localhost:1234/api/v1/errorThrowMiddleWare');
      expect(response.status).to.equal(400);
      const responseJSON = await response.text();
      expect(JSON.parse(responseJSON)).to.deep.equal({ message: 'This is error throw' });
    });
  });

  context('Provider', () => {
    it('should call provider functions', async () => {
      const response = await fetch('http://localhost:1234/api/v1/one/provider');
      expect(response.status).to.equal(200);
      const responseJSON = await response.json();
      expect(responseJSON).to.deep.equal({
        message: 'SubModuleOneServiceMethodCall|MainServiceMethodCall|CustomOneProviderMethodCall',
      });
    });
  });

  context('Error', () => {
    it('should give throw error', async () => {
      const response = await fetch('http://localhost:1234/api/v1/errorThrow');
      expect(response.status).to.equal(400);
      const responseJSON = await response.text();
      expect(JSON.parse(responseJSON)).to.deep.equal({ message: 'This is throw route error' });
    });

    it('should give promise error', async () => {
      const response = await fetch('http://localhost:1234/api/v1/errorPromise');
      expect(response.status).to.equal(400);
      const responseJSON = await response.text();
      expect(JSON.parse(responseJSON)).to.deep.equal({ message: 'This is promise route error.' });
    });
  });

  context('Database CRUD without ACL', () => {
    let testTable: TestTable;
    before(() => dropDB());

    it('should create new object', async () => {
      testTable = new TestTable({ variable: 123 });
      testTable.set('variable', 2);
      await testTable.save();
      expect(testTable.createdAt).to.exist;
      expect(testTable.updatedAt).to.exist;
      expect(testTable.updatedAt.toISOString()).to.equal(testTable.createdAt.toISOString());
      expect(testTable.id).to.exist;
      expect(testTable.get('variable')).to.equal(2);
    });

    it('should find object by Id', async () => {
      const emptyTable = new TestTable();
      emptyTable.id = testTable.id;
      await emptyTable.fetch();
      expect(emptyTable.updatedAt.toISOString()).to.equal(testTable.updatedAt.toISOString());
      expect(emptyTable.createdAt.toISOString()).to.equal(testTable.createdAt.toISOString());
      expect(emptyTable.id).to.equal(testTable.id);
      expect(emptyTable.get('variable')).to.equal(testTable.get('variable'));
    });

    it('should find items', async () => {
      const items = await TestTable.find();
      expect(items.length).to.equal(1);
      expect(items[0].updatedAt.toISOString()).to.equal(testTable.updatedAt.toISOString());
      expect(items[0].createdAt.toISOString()).to.equal(testTable.createdAt.toISOString());
      expect(items[0].id).to.equal(testTable.id);
      expect(items[0].get('variable')).to.equal(testTable.get('variable'));
    });

    it('should count items', async () => {
      const result = await TestTable.count();
      expect(result).to.equal(1);
    });

    it('should update same object', async () => {
      await testTable.save({ variable: 4 });
      expect(testTable.get('variable')).to.equal(4);
      expect(testTable.createdAt).to.exist;
      expect(testTable.updatedAt).to.exist;
      expect(testTable.updatedAt.valueOf()).to.greaterThan(testTable.createdAt.valueOf());
      expect(testTable.id).to.exist;
    });

    it('should delete item', async () => {
      await testTable.destroy();
      const items = await TestTable.find();
      expect(items.length).to.equal(0);
    });
  });
});
