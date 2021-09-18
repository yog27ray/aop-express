import { expect } from 'chai';
import fetch from 'node-fetch';
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

  context('Database', () => {
    it('should perform database actions', async () => {
      const testTable = new TestTable({ variable: 123 });
      testTable.set('variable', 2);
      await testTable.save();
    });
  });
});
