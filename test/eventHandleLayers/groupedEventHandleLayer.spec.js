/**
 * @fileoverview Test for GroupedEventHandleLayer.
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var GroupedEventHandleLayer = require('../../src/js/eventHandleLayers/groupedEventHandleLayer'),
    chartConst = require('../../src/js/const');

describe('GroupedEventHandleLayer', function() {
    var eventHandleLayer;

    beforeEach(function() {
        eventHandleLayer = new GroupedEventHandleLayer({
            bound: {
                dimension: {
                    width: 300,
                    height: 300
                }
            }
        });
    });

    describe('_makeNormalCoordinateData()', function() {
        it('라인 타입이 아닌 차트의 좌표기반 기본 data를 생성합니다.', function() {
            var actual = eventHandleLayer._makeNormalCoordinateData(200, 3),
                expected = [
                    {
                        min: 0,
                        max: 100
                    },
                    {
                        min: 100,
                        max: 200
                    }
                ];
            expect(actual).toEqual(expected);
        });
    });

    describe('makeCoordinateData()', function() {
        it('라인차트의 경우는 makeLineTypeCoordinateData() 실행 결과를 반환합니다.', function() {
            var dimension = {
                    height: 200
                },
                tickCount = 3,
                actual = eventHandleLayer.makeCoordinateData(dimension, tickCount, 'line'),
                expected = eventHandleLayer.makeLineTypeCoordinateData(dimension.height, tickCount);
            expect(actual).toEqual(expected);
        });

        it('라인차트가 아닌 경우는 _makeNormalCoordinateData() 실행 결과를 반환합니다.', function() {
            var dimension = {
                    height: 200
                },
                tickCount = 3,
                actual = eventHandleLayer.makeCoordinateData(dimension, tickCount, 'column'),
                expected = eventHandleLayer._makeNormalCoordinateData(dimension.height, tickCount);
            expect(actual).toEqual(expected);
        });
    });

    describe('_makeRange()', function() {
        it('라인타입인 경우에는 입력 scale의 중간값을 툴팁 범위로 반환합니다.', function() {
            var actual = eventHandleLayer._makeRange({
                    min: 0,
                    max: 100
                }, 'line'),
                expected = {
                    start: 50,
                    end: 50
                };
            expect(actual).toEqual(expected);
        });

        it('라인타입이 아닌 경우에는 입력 scale을 그대로 반환합니다.', function() {
            var actual = eventHandleLayer._makeRange({
                    min: 0,
                    max: 100
                }),
                expected = {
                    start: 0,
                    end: 100
                };
            expect(actual).toEqual(expected);
        });
    });

    describe('_getLayerPositionValue()', function() {
        it('세로차트에서 마우스 이벤트 지점의 index를 찾기위한 상대 좌표는 clientX와 bound.left의 차입니다.', function() {
            var actual = eventHandleLayer._getLayerPositionValue({
                    clientX: 100
                }, {
                    left: 50
                }, true),
                expected = 50;
            expect(actual).toBe(expected);
        });

        it('가로차트에서 마우스 이벤트 지점의 index를 찾기위한 상대 좌표는 clientY와 bound.top의 차입니다', function() {
            var actual = eventHandleLayer._getLayerPositionValue({
                    clientY: 100
                }, {
                    top: 50
                }),
                expected = 50;
            expect(actual).toBe(expected);
        });
    });

    describe('_getTooltipDirection()', function() {
        it('index가 중앙을 포함하여 this.coordinateData의 앞부분에 위치하면 forword를 반환합니다.', function() {
            var actual, expected;
            eventHandleLayer.coordinateData = [1, 2, 3, 4, 5];
            actual = eventHandleLayer._getTooltipDirection(2);
            expected = chartConst.TOOLTIP_DIRECTION_FORWORD;
            expect(actual).toBe(expected);
        });

        it('index가 this.coordinateData의 뒷부분에 위치하면 backword를 반환합니다.', function() {
            var actual, expected;
            eventHandleLayer.coordinateData = [1, 2, 3, 4, 5];
            actual = eventHandleLayer._getTooltipDirection(3);
            expected = chartConst.TOOLTIP_DIRECTION_BACKWORD;
            expect(actual).toBe(expected);
        });
    });
});