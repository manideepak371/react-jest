import React from 'react'
import ReactDom from 'react-dom'
import {render,screen,fireEvent, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ReactTest from './ReactTest'
import { Router, useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Routing from './Routing'
import {Sidepage} from './Routing'

test("react jest label test",()=>{
    render(<ReactTest/>)
    expect(screen.getAllByTestId("jest-label-test").at(0)).toBeInTheDocument()
    expect(screen.getAllByTestId("jest-label-test").at(0)).toBeVisible()
    expect(screen.getAllByTestId("jest-label-test").at(0)).toBeEnabled()
    expect(screen.getAllByTestId("jest-label-test").at(0).textContent).toBe("testing react label")
})

test("react jest button test",()=>{
    const wrapper=render(<ReactTest/>)
    expect(screen.getAllByTestId("jest-button-test").at(0)).toBeInTheDocument()
    expect(screen.getAllByTestId("jest-button-test").at(0)).toBeVisible()
    expect(screen.getAllByTestId("jest-button-test").at(0)).toBeEnabled()
    expect(screen.getAllByTestId("jest-button-test").at(0).textContent).toBe("Click React Test")
})

test("react jest input box test",()=>{
    const wrapper=render(<ReactTest/>)
    expect(screen.getAllByTestId('jest-inputBox-test')).toHaveLength(1)
    expect(screen.getAllByTestId('jest-inputBox-test')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('jest-inputBox-test')[0]).toBeVisible()
    expect(screen.getAllByTestId('jest-inputBox-test')[0]).toBeEnabled()
    expect(screen.getAllByTestId('jest-inputBox-test')[0].textContent).toBe('')
    const ele=screen.getAllByTestId('jest-inputBox-test')[0]
    ele.textContent="deepak"
    expect(ele.textContent).toBe('deepak')
    expect(ele.placeholder).toMatch('test input box')
})

test("jest props test",()=>{
    const argProp="testing props jest"
    render(<ReactTest arg={argProp}/>)
    expect(screen.getAllByTestId('jest-props-test').at(0).textContent).toBe(argProp)
})


test("hide unhide element after state change",()=>{
    render(<ReactTest/>)
    expect(screen.getByTestId('jest-unhide-test')).not.toBeVisible()
    const button=screen.getByTestId('jest-button-test')
    fireEvent.click(button)
    expect(screen.getByTestId('jest-unhide-test')).toBeVisible()
})

const server=setupServer()
beforeAll(()=>{
    server.listen()
})

test('server data test', async () => {
    render(<ReactTest/>)
    const ele=screen.queryByTestId('label-place')
    expect(ele).toBeNull()

    const dataHandler=rest.get('http://localhost:9000/',(req,res,ctx)=>{
        return res(ctx.json({data:[{placename:'Hyderabad'}]}))
    })
    server.use(dataHandler)
    const button=screen.getByTestId('jest-apicall-test')
    fireEvent.click(button)
    const label=await screen.findByTestId('label-place')
    expect(label).toBeInTheDocument()
})


test('Routing test Jest',async ()=>{
    //arrange initial route component
    const history=createMemoryHistory()
    render(<Router location={history.location} navigator={history}><Routing/></Router>)
    //assert default component elements    
    expect(screen.getByTestId('url-route-test-jest').textContent).toBe('/')
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('not-home-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link').textContent).toBe('Home page')
    expect(screen.getByTestId('not-home-link').textContent).toBe('Not Home page')
    expect(screen.queryByTestId('home-route-test-jest')).toBeNull()
    expect(screen.queryByTestId('side-route-test-jest')).toBeNull()

    //navigate to home page and verify route,component elements
    fireEvent.click(screen.getByTestId('home-link'))
    expect(history.location.pathname).toBe('/home')
    var {container,unmount}=render(<ReactTest/>)
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('not-home-link')).toBeInTheDocument()
    expect(screen.queryByTestId('home-route-test-jest')).toBeInTheDocument()
    expect(screen.queryByTestId('home-route-test-jest').textContent).toBe('Home Page')
    expect(screen.queryByTestId('side-route-test-jest')).toBeNull()
    unmount()

    //navigate to side page and verify route,component elements
    fireEvent.click(screen.getByTestId('not-home-link'))
    expect(history.location.pathname).toBe('/notHome')
    var {container,unmount}=render(<Sidepage/>)
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('not-home-link')).toBeInTheDocument()
    expect(screen.queryByTestId('side-route-test-jest')).toBeInTheDocument()
    expect(screen.queryByTestId('side-route-test-jest').textContent).toBe('Not Home Page')
    expect(screen.queryByTestId('home-route-test-jest')).toBeNull()
    unmount()

    //assert at last
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('not-home-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link').textContent).toBe('Home page')
    expect(screen.getByTestId('not-home-link').textContent).toBe('Not Home page')
    expect(screen.queryByTestId('home-route-test-jest')).toBeNull()
    expect(screen.queryByTestId('side-route-test-jest')).toBeNull()  
})